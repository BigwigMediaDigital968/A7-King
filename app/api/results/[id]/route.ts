import { connectDB } from "@/app/lib/mongodb";
import Result from "@/app/models/Results";
import { NextRequest, NextResponse } from "next/server";

interface Params {
  params: Promise<{ id: string }>;
}

export async function GET(req: NextRequest, { params }: Params) {
  try {
    await connectDB();
    const { id } = await params;

    const result = await Result.findById(id)
      .populate("sattaId", "name slug resultTime")
      .lean();

    if (!result) {
      return NextResponse.json(
        { success: false, message: "Result not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: result });
  } catch {
    return NextResponse.json(
      { success: false, message: "Failed to fetch result" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest, { params }: Params) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await req.json();

    const result = await Result.findByIdAndUpdate(
      id,
      {
        $set: {
          sattaId: body.sattaId,
          drawDate: body.drawDate,
          result: body.result,
          status: body.status,
          isActive: body.isActive,
        },
      },
      { new: true, runValidators: true }
    ).populate("sattaId", "name slug resultTime");

    if (!result) {
      return NextResponse.json(
        { success: false, message: "Result not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: result });
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

    const result = await Result.findByIdAndDelete(id);

    if (!result) {
      return NextResponse.json(
        { success: false, message: "Result not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Result deleted successfully",
    });
  } catch {
    return NextResponse.json(
      { success: false, message: "Failed to delete result" },
      { status: 500 }
    );
  }
}
