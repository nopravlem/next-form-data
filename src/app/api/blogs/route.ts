import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  // ~~~~~ OPTION: request sent as json ~~~~~
  const blog_data = await req.json();

  // ~~~~~ OPTION: request sent in form data ~~~~~
  // const formData = await req.formData();
  // const title = formData.get("title");
  // const content = formData.get("content");
  // const tags = formData.get("tags");
  // const images = formData.get("images");

  try {
    const client = await clientPromise;
    const database = client.db("sample_mflix"); // Using sample database
    database.collection("blogs").insertOne(blog_data);

    return NextResponse.json({ message: "Data saved successfully!" });
  } catch (error) {
    console.error(error);
  }
};

export const GET = async () => {
  try {
    const client = await clientPromise;
    const db = client.db("sample_mflix");
    const blogs = await db
      .collection("blogs")
      .find({})
      .sort({ _id: -1 }) // 1 for asc and -1 for desc -- newest addition first
      .toArray();

    return NextResponse.json(blogs);
  } catch (e) {
    console.error(e);
  }
};

export const DELETE = async (req: NextRequest) => {
  const blog_id = req.nextUrl.searchParams.get("id");
  if (!blog_id) return NextResponse.json({ message: "id is missing" });

  try {
    const client = await clientPromise;
    const database = client.db("sample_mflix"); // Using sample database
    database.collection("blogs").deleteOne({ _id: new ObjectId(blog_id) });

    return NextResponse.json({ message: "Blog successfully deleted!" });
  } catch (error) {
    console.error(error);
  }
};
