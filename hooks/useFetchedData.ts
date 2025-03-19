"use client";

import { useEffect, useState } from "react";

const useFetchData = () => {
  const [data, setData] = useState<{ _id: string; fileName: string; content: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // console.log("Fetching last record from API...");

        const response = await fetch("/api/fetchdata");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const lastRecord = await response.json();

        if (lastRecord) {
          // console.log("Last record fetched:", lastRecord); // Log the last record
          setData(lastRecord);
        } else {
          // console.log("No records found.");
          setData(null); // Set data to null if no records found
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Error fetching data.");
      } finally {
        setLoading(false); // Set loading to false once data fetching is complete
      }
    };

    fetchData(); // Call the fetchData function to fetch the record
  }, []);

  return { data, loading, error }; // Return the data, loading state, and error
};

export default useFetchData; // Export the custom hook here
