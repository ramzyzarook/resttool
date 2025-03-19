// app/api/data/route.js

import clientPromise from "../../../database/lib/mongodb";

export async function POST(request) {
  try {
    const client = await clientPromise;
    const db = client.db(); // uses the default database as per your URI
    const collection = db.collection("apispec"); // replace with your collection name

    // Parse the incoming JSON body
    const data = await request.json();

    // Insert the document into the collection
    const result = await collection.insertOne(data);

    // Return success response with inserted document
    return new Response(
      JSON.stringify({
        message: "Document successfully uploaded",
        insertedId: result.insertedId,
      }),
      {
        status: 201,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    // console.error(error);
    return new Response("Failed to connect to MongoDB", { status: 500 });
  }
}
