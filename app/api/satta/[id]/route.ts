import { connectDB } from "@/app/lib/mongodb";
import Satta from "@/app/models/Satta";
import { NextRequest, NextResponse } from "next/server";

interface Params {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(req: NextRequest, { params }: Params) {
  try {
    await connectDB();
    const { id } = await params;
    const satta = await Satta.findById(id);

    if (!satta) {
      return NextResponse.json(
        { success: false, message: "Satta not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: satta });
  } catch {
    return NextResponse.json(
      { success: false, message: "Failed to fetch satta" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest, { params }: Params) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await req.json();

    const satta = await Satta.findByIdAndUpdate(
      id,
      {
        $set: {
          name: body.name,
          slug: body.slug,
          resultTime: body.resultTime,
          isActive: body.isActive,
          tableNo: body.tableNo,
        },
      },
      { new: true, runValidators: true }
    );

    if (!satta) {
      return NextResponse.json(
        { success: false, message: "Satta not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: satta });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 400 }
    );
  }
}

export async function DELETE(req: NextRequest, { params }: Params) {
  try {
    await connectDB();
    const { id } = await params;
    const satta = await Satta.findByIdAndDelete(id);

    if (!satta) {
      return NextResponse.json(
        { success: false, message: "Satta not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Satta deleted successfully",
    });
  } catch {
    return NextResponse.json(
      { success: false, message: "Failed to delete satta" },
      { status: 500 }
    );
  }
}