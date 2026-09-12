// File: src/app/api/folders/route.js
import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET() {
  try {
    // Ambil semua subfolder di dalam "roganda-photo"
    const result = await cloudinary.api.sub_folders("roganda-photo");
    // Hasil: { folders: [ { name: "Pernikahan", path: "..." }, ... ] }
    const folderNames = result.folders.map((folder) => folder.name);
    return NextResponse.json(folderNames);
  } catch (error) {
    console.error("Error fetching folders:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
