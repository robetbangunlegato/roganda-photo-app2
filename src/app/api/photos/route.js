// File: src/app/api/photos/route.js
import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET() {
  try {
    let allResources = [];
    let nextCursor = null;
    let hasMore = true;

    while (hasMore) {
      // Bangun query
      let query = cloudinary.search
        .expression("folder:roganda-photo/*")
        .sort_by("created_at", "desc")
        .max_results(100); // Maksimal 100 per request (batas aman)

      if (nextCursor) {
        query = query.next_cursor(nextCursor);
      }

      const result = await query.execute();

      allResources = allResources.concat(result.resources);
      nextCursor = result.next_cursor;
      hasMore = !!nextCursor;
    }

    return NextResponse.json(allResources);
  } catch (error) {
    console.error("Error fetching photos:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
