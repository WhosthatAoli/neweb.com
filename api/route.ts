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
    const cb =
      await sql`INSERT INTO Websites (name, img, url, description, feature) VALUES (${name}, ${img},${url},${description},${feature});`;
    console.log("cb: ", cb);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
  const websites = await sql`SELECT * FROM Websites;`;
  return websites;
}

// export async function AddWebsitesToCategory({
//   name,
//   img,
//   url,
//   description,
//   feature,
//   category,
// }: {
//   name: string;
//   img: string;
//   url: string;
//   description: string;
//   feature: string;
//   category: string;
// }) {
//   try {
//     await sql`INSERT INTO ${category} (name, img, url, description, feature) VALUES (${name}, ${img},${url},${description},${feature});`;
//     return NextResponse.json({ result: "success" }, { status: 200 });
//   } catch (error) {
//     return NextResponse.json({ error }, { status: 500 });
//   }
// }

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

export async function DeleteWebsitesFromWebsites({
  websiteName,
}: {
  websiteName: string;
}) {
  try {
    console.log("websiteName: ", websiteName);

    const sqlQuery = `DELETE FROM Websites WHERE name = ${websiteName};`;
    console.log(sqlQuery);

    const cb = await sql`DELETE FROM Websites WHERE name = ${websiteName};`;
    console.log("deleted", cb);

    return NextResponse.json({ result: "success" }, { status: 200 });
  } catch (error) {
    console.log("error: ", error);

    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function UpdateWebsitesToWebsites({
  name,
  newName,
  img,
  url,
  description,
  feature,
}: {
  name: string;
  newName: string;
  img: string;
  url: string;
  description: string;
  feature: string;
}) {
  try {
    await sql`UPDATE Websites SET url = ${url}, description = ${description}, img = ${img}, name = ${newName}, feature = ${feature} WHERE name = '${name}';`;
    return NextResponse.json({ result: "success" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
