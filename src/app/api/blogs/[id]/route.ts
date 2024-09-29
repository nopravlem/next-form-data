import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (
  _req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const client = await clientPromise;
    const database = client.db("sample_mflix"); // Using sample database
    database.collection("blogs").deleteOne({ _id: new ObjectId(params.id) });

    return NextResponse.json({ message: "Blog successfully deleted!" });
  } catch (error) {
    console.error(error);
  }
};
