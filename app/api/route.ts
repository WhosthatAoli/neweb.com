import { NextResponse } from 'next/server'
import { GetWebsites, AddWebsites } from "../../api/route";
import { QueryResult, QueryResultRow } from '@vercel/postgres';
import {takeScreenshot} from "../../scripts/updateScreenshots.js"
import path from "path";

export async function GET() {
    const websites = await GetWebsites();
    const websitesData = websites.rows;
    return NextResponse.json({ websitesData }, { status: 200 })
}


export async function POST(req: Request) {
    if (req.method === 'POST') {
        try {
            const formData = await req.json();
            console.log("formData: ", formData);
            if (formData.img === "") {
                await takeScreenshot(formData.url, formData.name);
                formData.img = path.resolve("/screenshots/" + formData.name + ".png");
            }
            const websites = await AddWebsites(formData);
            const websitesData = (websites as QueryResult<QueryResultRow>).rows;
            return NextResponse.json({ websitesData }, { status: 200 });
        } catch (error) {
            return NextResponse.json({ error: 'An error occurred while adding the website.' }, { status: 500 });
        }
    } else {
        return NextResponse.json({ error: 'Method not allowed.' }, { status: 405 });
    }
}

