import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function CreateTable() {
  try {
    const result =
      await sql`CREATE TABLE Websites ( name varchar(255), img varchar(255), url varchar(255), description varchar(255),feature varchar(255));`;
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function AddWebsites({
  name,
  img,
  url,
  description,
  feature,
}: {
  name: string;
  img: string;
  url: string;
  description: string;
  feature: string;
}) {
  try {
    await sql`INSERT INTO Websites (name, img, url, description, feature) VALUES (${name}, ${img},${url},${description},${feature});`;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
  const websites = await sql`SELECT * FROM Websites;`;
  return websites;
}

export async function AddWebsitesToCategory({
  name,
  img,
  url,
  description,
  feature,
  category,
}: {
  name: string;
  img: string;
  url: string;
  description: string;
  feature: string;
  category: string;
}) {
  try {
    await sql`INSERT INTO ${category} (name, img, url, description, feature) VALUES (${name}, ${img},${url},${description},${feature});`;
    return NextResponse.json({ result: "success" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function GetWebsites() {
  const websites = await sql`SELECT * FROM Websites;`;
  return websites;
}

export async function GetWebsitesFromCategory({
  category,
}: {
  category: string;
}) {
  const websites = await sql`SELECT * FROM ${category};`;
  return websites;
}

export async function GetData(tableName: string) {
  const data = await sql`SELECT * FROM ${tableName};`;
  return data;
}
