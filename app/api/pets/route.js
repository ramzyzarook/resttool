import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Function to read data.json from the public directory


// GET: Retrieve all pets with pagination
export async function GET(request) {
  const data = getData();
  const pets = data.pets || [];

  // Get query parameters for pagination
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page") || "1", 10); // Default to page 1
  const pageNum = parseInt(url.searchParams.get("pageNum") || "10", 10); // Default to pageNum 10

  // Ensure page and pageNum are positive integers
  if (page <= 0 || pageNum <= 0) {
    return NextResponse.json(
      { message: "Invalid page or pageNum" },
      { status: 400 }
    );
  }

  // Calculate the start and end index for the pagination
  const startIndex = (page - 1) * pageNum;
  const endIndex = page * pageNum;

  // Slice the array to get the current page of pets
  const paginatedPets = pets.slice(startIndex, endIndex);

  // Create response object with pagination information
  const response = {
    pets: paginatedPets,
    totalPets: pets.length,
    page,
    pageNum,
    totalPages: Math.ceil(pets.length / pageNum),
  };
  // console.log("Response", response);
  // console.log("Response", response);
  return NextResponse.json(response);
}

// Function to read data.json from the public directory
const getData = () => {
  try {
    const filePath = path.resolve("public", "data.json");
    const rawData = fs.readFileSync(filePath);
    return JSON.parse(rawData);
  } catch (error) {
    // console.error("Error reading data.json:", error);
    throw new Error("Could not read data.json");
  }
};

// POST: Create a new pet
export async function POST(request) {
  const data = getData();
  const newPet = await request.json();

  // Validate age, name, and species
  if (
    !newPet.name ||
    typeof newPet.name !== "string" ||
    newPet.name.trim() === ""
  ) {

    return NextResponse.json(
      {
        message:
          "Parameter error: Name is required and should be a valid string",
      },
      { status: 404 }
    );
  }

  if (
    !newPet.species ||
    typeof newPet.species !== "string" ||
    newPet.species.trim() === ""
  ) {
    return NextResponse.json(
      {
        message:
          "Parameter error: Species is required and should be a valid string",
      },
      { status: 404 }
    );
  }

  if (!newPet.age || typeof newPet.age !== "number" || newPet.age <= 0) {
    return NextResponse.json(
      { message: "Parameter error: Age must be a positive number" },
      { status: 400 }
    );
  }

  // Check if there's an existing pet and increment the id for the new pet
  const lastPet = data.pets[data.pets.length - 1];
  const newId = lastPet ? parseInt(lastPet.id, 10) + 1 : 1; // Use parseInt() to convert to integer

  // Assign the new id to the pet
  newPet.id = newId;

  // Add the new pet to the data
  data.pets.push(newPet);

  // Write updated data back to the JSON file
  try {
    fs.writeFileSync(
      path.resolve("public", "data.json"),
      JSON.stringify(data, null, 2)
    );
    return NextResponse.json(newPet);
  } catch (error) {
    // console.error("Error writing to data.json:", error);
    return NextResponse.json(
      { message: "Failed to save new pet" },
      { status: 500 }
    );
  }
}
