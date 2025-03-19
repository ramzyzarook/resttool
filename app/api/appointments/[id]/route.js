import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Function to read data from appointments.json file in the public folder
const getAppointmentsData = () => {
  try {
    // Ensure the correct file path
    const filePath = path.resolve("public", "data.json");

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      throw new Error(`File not found at ${filePath}`);
    }

    const rawData = fs.readFileSync(filePath, "utf-8"); // Added encoding to prevent buffer issues
    return JSON.parse(rawData);
  } catch (error) {
    // console.error("Error reading appointments.json:", error);
    throw new Error("Could not read appointments.json");
  }
};

// GET: Retrieve a specific appointment by ID
export async function GET(req, { params }) {
  const { id } = params;

  try {
    // Ensure ID is provided
    if (!id) {
      return NextResponse.json(
        { message: "Appointment ID is required" },
        { status: 400 }
      );
    }

    const data = getAppointmentsData();
    const appointment = data.appointments.find((a) => a.id === id);

    if (!appointment) {
      return NextResponse.json(
        { message: `Appointment with ID ${id} not found` },
        { status: 404 }
      );
    }

    return NextResponse.json(appointment);
  } catch (error) {
    // console.error("Error in GET method:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

// PUT: Update appointment details by ID
export async function PUT(req, { params }) {
  const { id } = params;
  const updatedData = await req.json();

  try {
    if (!id) {
      return NextResponse.json(
        { message: "Appointment ID is required" },
        { status: 400 }
      );
    }

    // Ensure valid data
    if (
      !updatedData ||
      !updatedData.pet_id ||
      !updatedData.owner_id ||
      !updatedData.date
    ) {
      return NextResponse.json(
        { message: "Missing required fields (pet_id, owner_id, date)" },
        { status: 400 }
      );
    }

    const data = getAppointmentsData();
    const appointmentIndex = data.appointments.findIndex((a) => a.id === id);

    if (appointmentIndex === -1) {
      return NextResponse.json(
        { message: `Appointment with ID ${id} not found` },
        { status: 404 }
      );
    }

    // Update the appointment details
    data.appointments[appointmentIndex] = { id, ...updatedData };

    // Write updated data back to the JSON file
    fs.writeFileSync(path.resolve("public", "data.json"), JSON.stringify(data));

    return NextResponse.json({ message: "Appointment updated successfully" });
  } catch (error) {
    // console.error("Error in PUT method:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

// DELETE: Delete an appointment by ID
export async function DELETE(req, { params }) {
  const { id } = params;

  try {
    if (!id) {
      return NextResponse.json(
        { message: "Appointment ID is required" },
        { status: 400 }
      );
    }

    const data = getAppointmentsData();
    const appointmentIndex = data.appointments.findIndex((a) => a.id === id);

    if (appointmentIndex === -1) {
      return NextResponse.json(
        { message: `Appointment with ID ${id} not found` },
        { status: 404 }
      );
    }

    // Remove the appointment from the array
    data.appointments.splice(appointmentIndex, 1);

    // Write updated data back to the JSON file
    fs.writeFileSync(path.resolve("public", "data.json"), JSON.stringify(data));

    return NextResponse.json({ message: "Appointment deleted successfully" });
  } catch (error) {
    // console.error("Error in DELETE method:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
