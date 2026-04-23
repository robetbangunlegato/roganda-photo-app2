// File: src/app/api/photos/route.js
import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

// Konfigurasi koneksi ke Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET() {
  try {
    // Ini layaknya query Database!
    // Kita perintahkan: "Cari semua file di dalam folder roganda-photo"
    const result = await cloudinary.search
      .expression("folder:roganda-photo/*")
      .sort_by("created_at", "desc") // Urutkan dari yang terbaru
      .max_results(100) // Ambil maksimal 100 foto
      .execute();

    return NextResponse.json(result.resources);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
