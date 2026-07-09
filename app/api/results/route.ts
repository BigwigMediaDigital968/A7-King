import { connectDB } from "@/app/lib/mongodb";
import Result from "@/app/models/Results";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const sattaId = searchParams.get("sattaId");
    const status = searchParams.get("status");

    const filter: Record<string, any> = {};
    if (sattaId) filter.sattaId = sattaId;
    if (status) filter.status = status;

    const results = await Result.find(filter)
      .populate("sattaId", "name slug resultTime")
      .sort({ drawDate: -1 })
      .lean();

    return NextResponse.json({ success: true, data: results });
  } catch {
    return NextResponse.json(
      { success: false, message: "Failed to fetch results" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();

    const result = await Result.create({
      sattaId: body.sattaId,
      drawDate: body.drawDate,
      result: body.result,
      status: body.status ?? "draft",
      isActive: body.isActive ?? true,
    });

    const populated = await result.populate("sattaId", "name slug resultTime");

    return NextResponse.json(
      { success: true, data: populated },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 400 }
    );
  }
}
