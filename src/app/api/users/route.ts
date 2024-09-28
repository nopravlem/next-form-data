import clientPromise from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

// TEST GET: using users collection in sample_mflix database MongoDB to understand routes
export const GET = async () => {
  try {
    const client = await clientPromise;
    const db = client.db("sample_mflix");
    const movies = await db
      .collection("users")
      .find({})
      .sort({ _id: -1 }) // 1 for asc and -1 for desc
      .limit(10)
      .toArray();
    return NextResponse.json(movies);
  } catch (e) {
    console.error(e);
  }
};

// TEST POST: using users collection in sample_mflix database MongoDB to understand routes
export const POST = async (req: NextRequest) => {
  const formData = await req.formData();
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    const client = await clientPromise;
    const database = client.db("sample_mflix");
    database.collection("users").insertOne({ name, email, password });

    return NextResponse.json({ message: "Data saved successfully!" });
  } catch (error) {
    console.error(error);
  }
};
