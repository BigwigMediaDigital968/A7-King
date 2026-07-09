import { connectDB } from "@/app/lib/mongodb";
import Satta from "@/app/models/Satta";
import { NextRequest, NextResponse } from "next/server";


export async function GET() {
  try {
    await connectDB();

    const areas = await Satta.find()
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({
      success: true,
      data: areas,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch areas",
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();

    const area = await Satta.create({
      name: body.name,
      slug: body.slug,
    });

    return NextResponse.json(
      {
        success: true,
        data: area,
      },
      {
        status: 201,
      }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      {
        status: 400,
      }
    );
  }
}