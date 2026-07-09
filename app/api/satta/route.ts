import { connectDB } from "@/app/lib/mongodb";
import Satta from "@/app/models/Satta";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();

    const sattaGames = await Satta.find()
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({
      success: true,
      data: sattaGames,
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch satta games",
      },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();

    const satta = await Satta.create({
      name: body.name,
      slug: body.slug,
      resultTime: body.resultTime,
      isActive: body.isActive ?? true,
    });

    return NextResponse.json(
      {
        success: true,
        data: satta,
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 400 }
    );
  }
}