import { NextResponse } from "next/server";
import { takeScreenshot } from "@/app/lib/scripts/updateScreenshots";
import path from "path";
import { getStorage, ref as ref_storage, uploadBytes } from "firebase/storage";
import firebase_app from "@/app/api/firebaseApi/firebaseConfig";

export async function POST(req: Request) {
  try {
    const formData = await req.json();
    console.log("formData: ", formData);
    let img = formData.img;
    if (img === "") {
      const imgBuffer = await takeScreenshot(formData.url, formData.name);
      if (imgBuffer !== null) {
        // 如果截图了. 开始上传图片
        const storage = getStorage(firebase_app);
        img = path.resolve("/screenshots/" + formData.name + ".png");
        const storageRef = ref_storage(storage, img);
        uploadBytes(storageRef, imgBuffer).then((snapshot) => {
          console.log("Uploaded a blob or file!");
        });
      } else {
        throw new Error("take screenshot error");
      }
    }
    console.log("img: ", img);

    return NextResponse.json({ img }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "fetch screenshot error" },
      { status: 500 }
    );
  }
}
