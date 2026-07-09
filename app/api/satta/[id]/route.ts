import { connectDB } from "@/app/lib/mongodb";
import Satta from "@/app/models/Satta";
import { NextRequest, NextResponse } from "next/server";

interface Params {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(
  req: NextRequest,
  { params }: Params
) {
  try {
    await connectDB();

    const { id } = await params;

    const area = await Satta.findById(id);

    if (!area) {
      return NextResponse.json(
        {
          success: false,
          message: "Area not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      data: area,
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch area",
      },
      {
        status: 500,
      }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: Params
) {
  try {
    await connectDB();

    const { id } = await params;

    const body = await req.json();

    const area = await Satta.findByIdAndUpdate(
      id,
      {
        $set: {
          name: body.name,
          slug: body.slug,
          isActive: body.isActive,
        },
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!area) {
      return NextResponse.json(
        {
          success: false,
          message: "Area not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      data: area,
    });
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

export async function DELETE(
  req: NextRequest,
  { params }: Params
) {
  try {
    await connectDB();

    const { id } = await params;

    const area = await Satta.findByIdAndDelete(id);

    if (!area) {
      return NextResponse.json(
        {
          success: false,
          message: "Area not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Area deleted successfully",
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete area",
      },
      {
        status: 500,
      }
    );
  }
}