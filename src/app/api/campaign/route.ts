import clientPromise from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  // ~~~~~ OPTION: request sent as json ~~~~~
  const campaign_data = await req.json();
  console.log(campaign_data);

  // ~~~~~ OPTION: request sent in form data ~~~~~
  // const formData = await req.formData();
  // const name = formData.get("name");
  // const description = formData.get("email");
  // const tags = formData.get("tags");
  // const images = formData.get("images");

  try {
    const client = await clientPromise;
    const database = client.db("sample_mflix"); // Using sample database
    database.collection("campaigns").insertOne(campaign_data);

    return NextResponse.json({ message: "Data saved successfully!" });
  } catch (error) {
    console.error(error);
  }
};
