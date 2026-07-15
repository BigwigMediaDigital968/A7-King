import { connectDB } from "@/app/lib/mongodb";
import Contact from "@/app/models/Contact";
import { NextRequest, NextResponse } from "next/server";

function generateReferenceIdFromName(name: string) {
    const safeName = name.trim().toUpperCase().replace(/[^A-Z0-9]/g, "");
    const prefix = safeName ? safeName.slice(0, 6) : "CNT";
    const randomPart = Math.random().toString(36).substring(2, 8).toUpperCase().replace(/[^A-Z0-9]/g, "");
    return `${prefix}${randomPart}`.slice(0, 10);
}

async function buildUniqueReferenceId(name: string) {
    let id = generateReferenceIdFromName(name);
    let attempts = 0;

    while (attempts < 5) {
        const exists = await Contact.exists({ referenceId: id });
        if (!exists) return id;
        id = generateReferenceIdFromName(name + Math.random().toString(36).substring(2, 4));
        attempts += 1;
    }

    return `${name.trim().toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 4)}${Date.now().toString(36).toUpperCase().slice(-4)}`.slice(0, 10);
}

export async function GET(req: NextRequest) {
    try {
        await connectDB();

        const { searchParams } = new URL(req.url);
        const search = searchParams.get("search");
        const filter: Record<string, any> = {};

        if (search) {
            const tokens = search
                .split(",")
                .map((item) => item.trim())
                .filter(Boolean);

            filter.$or = tokens.flatMap((token) => {
                const parts: Record<string, any>[] = [
                    { name: { $regex: token, $options: "i" } },
                    { whatsappNumber: { $regex: token, $options: "i" } },
                    { telegramLink: { $regex: token, $options: "i" } },
                    { email: { $regex: token, $options: "i" } },
                    { referenceId: token },
                ];

                if (/^[0-9a-fA-F]{24}$/.test(token)) {
                    parts.push({ _id: token });
                }

                return parts;
            });
        }

        const contacts = await Contact.find(filter).sort({ createdAt: -1 }).lean();
        return NextResponse.json({ success: true, data: contacts });
    } catch (error: any) {
        console.error("[/api/contact] error:", error);
        return NextResponse.json(
            { success: false, message: "Failed to fetch contact data" },
            { status: 500 }
        );
    }
}

export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const body = await req.json();

        if (!body.name || typeof body.name !== "string") {
            return NextResponse.json(
                { success: false, message: "Name is required to generate reference ID." },
                { status: 400 }
            );
        }

        const referenceId = await buildUniqueReferenceId(body.name);

        const contact = await Contact.create({
            name: body.name,
            whatsappNumber: body.whatsappNumber,
            telegramLink: body.telegramLink,
            email: body.email,
            isActive: body.isActive ?? true,
            referenceId,
        });
        
        return NextResponse.json({ success: true, data: contact }, { status: 201 });

    } catch (error: any) {
        return NextResponse.json(
            { success: false, message: error.message || "Failed to create contact" },
            { status: 400 }
        );
    }
}
