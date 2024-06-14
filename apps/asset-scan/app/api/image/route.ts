import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get("url");

  if (!url) {
    return NextResponse.json({ error: "url is required" }, {
      status: 400,
      statusText: "url is required"
    });
  }

  try {
    const response = await fetch(url);
    const isImage = response.headers.get("Content-Type") !== "application/octet-stream";
    if (!isImage) {
      response.headers.set("Content-Type", "image/jpeg");
    }
    const res = new NextResponse(response.body, {
      headers: response.headers
    });
    return res;
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to fetch image' }, {
      status: 500
    });
  }
}