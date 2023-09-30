import { NextResponse } from "next/server";
import { takeScreenshot } from "@/app/lib/scripts/updateScreenshots";
import { uploadImageFile } from "@/app/api/firebaseApi/firebaseFunc";

export async function POST(req: Request) {
  try {
    const formData = await req.json();
    // console.log("formData: ", formData);
    const imgFile = await takeScreenshot(formData.url, formData.name);
    await uploadImageFile(imgFile, formData);
    return NextResponse.json(
      { message: "fetch screenshot success, and uploaded" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "fetch screenshot error", error },
      { status: 500 }
    );
  }
}
