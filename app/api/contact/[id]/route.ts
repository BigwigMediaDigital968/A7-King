import mongoose from "mongoose";
import { connectDB } from "@/app/lib/mongodb";
import Contact from "@/app/models/Contact";
import { NextRequest, NextResponse } from "next/server";

interface Params {
  params: Promise<{ id: string }>;
}

export async function GET(req: NextRequest, { params }: Params) {
  try {
    await connectDB();
    const { id } = await params;
    const query = mongoose.isValidObjectId(id)
      ? { $or: [{ _id: id }, { referenceId: id }] }
      : { referenceId: id };

    const contact = await Contact.findOne(query).lean();

    if (!contact) {
      return NextResponse.json(
        { success: false, message: "Contact not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: contact });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Failed to fetch contact" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest, { params }: Params) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await req.json();

    const query = mongoose.isValidObjectId(id)
      ? { $or: [{ _id: id }, { referenceId: id }] }
      : { referenceId: id };

    const contact = await Contact.findOneAndUpdate(
      query,
      {
        $set: {
          name: body.name,
          whatsappNumber: body.whatsappNumber,
          telegramLink: body.telegramLink,
          email: body.email,
          isActive: body.isActive,
        },
      },
      { new: true, runValidators: true }
    ).lean();

    if (!contact) {
      return NextResponse.json(
        { success: false, message: "Contact not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: contact });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Failed to update contact" },
      { status: 400 }
    );
  }
}

export async function DELETE(req: NextRequest, { params }: Params) {
  try {
    await connectDB();
    const { id } = await params;

    const query = mongoose.isValidObjectId(id)
      ? { $or: [{ _id: id }, { referenceId: id }] }
      : { referenceId: id };

    const contact = await Contact.findOneAndDelete(query);

    if (!contact) {
      return NextResponse.json(
        { success: false, message: "Contact not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: "Contact deleted successfully" });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Failed to delete contact" },
      { status: 500 }
    );
  }
}
