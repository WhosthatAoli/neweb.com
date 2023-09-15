import { NextResponse } from "next/server";
import {
  GetWebsites,
  AddWebsites,
  DeleteWebsitesFromWebsites,
} from "../../api/route";
import { QueryResult, QueryResultRow } from "@vercel/postgres";
import { takeScreenshot } from "../../scripts/updateScreenshots.js";
import path from "path";

export async function GET() {
  const websites = await GetWebsites();
  const websitesData = websites.rows;
  return NextResponse.json({ websitesData }, { status: 200 });
}

export async function POST(req: Request) {
  if (req.method === "POST") {
    try {
      const formData = await req.json();
      console.log("formData: ", formData);
      if (formData.img === "") {
        const isNull = await takeScreenshot(formData.url, formData.name);
        if (isNull !== null) {
          formData.img = path.resolve("/screenshots/" + formData.name + ".png");
        }
      }
      const websites = await AddWebsites(formData);
      const websitesData = (websites as QueryResult<QueryResultRow>).rows;
      return NextResponse.json({ websitesData }, { status: 200 });
    } catch (error) {
      return NextResponse.json(
        { error: "An error occurred while adding the website." },
        { status: 500 }
      );
    }
  } else {
    return NextResponse.json({ error: "Method not allowed." }, { status: 405 });
  }
}

export async function DELETE(req: Request) {
  if (req.method === "DELETE") {
    try {
      const { websiteName } = await req.json();
      await DeleteWebsitesFromWebsites({ websiteName });
      return NextResponse.json(
        { message: "Website successfully deleted from category." },
        { status: 200 }
      );
    } catch (error) {
      return NextResponse.json(
        {
          error: "An error occurred while deleting the website from category.",
        },
        { status: 500 }
      );
    }
  } else {
    return NextResponse.json({ error: "Method not allowed." }, { status: 405 });
  }
}
