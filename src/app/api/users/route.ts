import clientPromise from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

// TEST GET: using users collection in sample_mflix database MongoDB to understand routes
export const GET = async (props: any) => {
    try {
        const client = await clientPromise;
        const db = client.db("sample_mflix");
        const movies = await db
            .collection("users")
            .find({})
            .sort({ metacritic: -1 })
            .limit(10)
            .toArray();
        return NextResponse.json(movies);
    } catch (e) {
        console.error(e);
    }
}

// TEST POST: using users collection in sample_mflix database MongoDB to understand routes
export const POST = async (req: NextRequest) => {
  const blah = await req.json();
  console.log(blah);

  // const formData = await req.formData()
  // const name = formData.get('name');
  // const email = formData.get('email')
  // console.log(name)
    // return Response.json({ name, email })

  try {
    const client = await clientPromise;
    await client.connect();

    // Choose a name for your database
    const database = client.db("sample_mflix");

    // Choose a name for your collection
    const collection = database.collection("users");

    // await collection.insertOne({ data });

    return NextResponse.json({ message: "Data saved successfully!" })
  } catch (error) {
    // res.status(500).json({ message: "Something went wrong!" });

    console.error(error);
  }
};
