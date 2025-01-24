import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

cloudinary.config({
  cloud_name: 'daduiowmw',
  api_key: '695571773737565',
  api_secret: 'CvslvXFbBHvfeHvnomwNTHC_yYY',
});

export async function POST(req) {
  try {
    const { image } = await req.json();
    const uploadResponse = await cloudinary.uploader.upload(image, {
      folder: "uploads",
    });

    return NextResponse.json({ imageUrl: uploadResponse.secure_url });
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    return NextResponse.json({ error: "Image upload failed" }, { status: 500 });
  }
}
