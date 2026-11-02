import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.IMGBB_API_KEY;

    if (!apiKey) {
      console.error("Missing IMGBB_API_KEY in environment variables");
      return NextResponse.json(
        { success: false, message: "ImgBB API key is not configured on the server." },
        { status: 500 }
      );
    }

    const formData = await req.formData();
    const file = formData.get("image") as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, message: "No image file provided." },
        { status: 400 }
      );
    }

    // Convert file to base64 for ImgBB upload
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64Image = buffer.toString("base64");

    const imgbbBody = new FormData();
    imgbbBody.append("image", base64Image);

    const imgbbRes = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
      method: "POST",
      body: imgbbBody,
    });

    const imgbbData = await imgbbRes.json();

    if (!imgbbRes.ok || !imgbbData.success) {
      console.error("ImgBB upload error:", imgbbData);
      return NextResponse.json(
        { success: false, message: imgbbData?.error?.message || "ImgBB upload failed." },
        { status: 502 }
      );
    }

    const imageUrl = imgbbData.data?.url || imgbbData.data?.display_url;

    return NextResponse.json({
      success: true,
      url: imageUrl,
    });
  } catch (error: any) {
    console.error("Profile image upload route error:", error);
    return NextResponse.json(
      { success: false, message: error?.message || "Internal server error during image upload." },
      { status: 500 }
    );
  }
}

