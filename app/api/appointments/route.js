import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Function to read data from appointments.json file in the public folder
const getAppointmentsData = () => {
  try {
    const filePath = path.resolve("public", "data.json"); // Corrected path
    const rawData = fs.readFileSync(filePath);
    return JSON.parse(rawData);
  } catch (error) {
    // console.error("Error reading data.json:", error);
    throw new Error("Could not read data.json");
  }
};

// POST: Create a new appointment
export async function POST(request) {
  const data = getAppointmentsData();
  const newAppointment = await request.json();

  // Generate new appointment ID (simple example, should be replaced with better logic)
  const newAppointmentId = String(data.appointments.length + 1);

  const appointmentWithId = {
    id: newAppointmentId,
    ...newAppointment,
  };

  // Add the new appointment to the array
  data.appointments.push(appointmentWithId);

  // Write updated data back to the JSON file
  fs.writeFileSync(path.resolve("public", "data.json"), JSON.stringify(data));

  return NextResponse.json(appointmentWithId, { status: 201 });
}

// GET: Retrieve all appointments
export async function GET(request) {
  const data = getAppointmentsData();
  const appointments = data.appointments;

  return NextResponse.json(appointments);
}
