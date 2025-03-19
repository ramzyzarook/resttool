import { cookies } from "next/headers"; // Server-side only
import TestApi from "./TestApi";

export default function TestApiServer() {
  const cookieStore = cookies();
  var cookieData = cookieStore.get("validatedTests")
  cookieData = JSON.parse(cookieData.value)
  // console.log(cookieData)

  return <TestApi testCases={cookieData.testCases || []} />;
}
