import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Function to read data.json from the public directory
const getData = () => {
  try {
    const filePath = path.resolve("public", "data.json");
    const rawData = fs.readFileSync(filePath, "utf8");
    return JSON.parse(rawData);
  } catch (error) {
    // console.error("Error reading data.json:", error);
    throw new Error("Could not read data.json");
  }
};

// Function to write updated data back to the JSON file
const updateData = (data) => {
  try {
    const filePath = path.resolve("public", "data.json");
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
  } catch (error) {
    // console.error("Error writing to data.json:", error);
    throw new Error("Could not update data.json");
  }
};

// GET: Retrieve a specific pet by ID
export async function GET(req, { params }) {
  const { id } = params;
  
  try {
    const data = getData();
    const pet = data.pets.find((p) => p.id === id);

    // if (!pet) {
    //   return NextResponse.json({ message: "Pet not found" }, { status: 404 });
    // }

    return NextResponse.json(pet);
  } catch (error) {
    // console.error("Error in GET method:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

// PUT: Update pet details by ID
export async function PUT(req, { params }) {
  const { id } = params;
  const updatedData = await req.json();

  try {
    const data = getData();
    const petIndex = data.pets.findIndex((p) => p.id === id);

    if (petIndex === -1) {
      return NextResponse.json({ message: "Pet not found" }, { status: 404 });
    }

    // Update pet details
    data.pets[petIndex] = { ...data.pets[petIndex], ...updatedData };

    // Write updated data back to the JSON file
    updateData(data);

    return NextResponse.json(data.pets[petIndex]);
  } catch (error) {
    // console.error("Error in PUT method:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

// DELETE: Delete a pet by ID
export async function DELETE(req, { params }) {
  const { id } = params;

//   try {
    const data = getData();
    const petIndex = data.pets.findIndex((p) => p.id === id);

    // if (petIndex === -1) {
    //   return NextResponse.json({ message: "Pet not found" }, { status: 404 });
    // }

    // Remove pet from the array
    const deletedPet = data.pets.splice(petIndex, 1)[0];

    // Write updated data back to the JSON file
    updateData(data);

    return NextResponse.json({ message: "Pet deleted successfully", pet: deletedPet });
//   } catch (error) {
//     console.error("Error in DELETE method:", error);
//     return NextResponse.json({ message: "Server error" }, { status: 500 });
//   }
}
