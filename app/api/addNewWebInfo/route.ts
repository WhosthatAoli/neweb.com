import { NextResponse } from "next/server";
import {
  GetWebsites,
  AddWebsites,
  DeleteWebsitesFromWebsites,
} from "../../../api/route";
import { QueryResult, QueryResultRow } from "@vercel/postgres";
import { takeScreenshot } from "../../../scripts/updateScreenshots.js";
import path from "path";


export async function GET() {
  try {
    const websites = await GetWebsites();
    const websitesData = websites.rows;
    return NextResponse.json({ websitesData }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function POST(req: Request) {
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
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { websiteName } = await req.json();
    await DeleteWebsitesFromWebsites({ websiteName });
    return NextResponse.json(
      { message: "Website successfully deleted from category." },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}