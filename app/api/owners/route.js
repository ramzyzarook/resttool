import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Function to read owners.json from the public directory
const getOwnersData = () => {
  try {
    const filePath = path.resolve("public", "data.json");
    const rawData = fs.readFileSync(filePath, "utf8");
    return JSON.parse(rawData);
  } catch (error) {
    // console.error("Error reading owners.json:", error);
    throw new Error("Could not read owners.json");
  }
};

// Function to write updated owners data to the JSON file
const updateOwnersData = (data) => {
  try {
    const filePath = path.resolve("public", "data.json");
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
  } catch (error) {
    // console.error("Error writing to owners.json:", error);
    throw new Error("Could not update owners.json");
  }
};

// POST: Create a new owner
export async function POST(req) {
  const newOwner = await req.json();

  try {
    const data = getOwnersData();

    // Generate a new ID for the new owner (incremental ID based on existing data length)
    const newId = (data.owners.length + 1).toString();
    newOwner.id = newId;

    // Add the new owner to the list
    data.owners.push(newOwner);

    // Write updated data back to the JSON file
    updateOwnersData(data);

    return NextResponse.json(newOwner, { status: 201 });
  } catch (error) {
    // console.error("Error in POST method:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

// GET: Retrieve all owners
export async function GET() {
  try {
    const data = getOwnersData();
    return NextResponse.json(data.owners, { status: 200 });
  } catch (error) {
    // console.error("Error in GET method:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
