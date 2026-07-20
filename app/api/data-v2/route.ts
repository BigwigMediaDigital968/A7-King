import { NextResponse } from "next/server";

// const API_URL =
//   "https://sattaapi.com/wp-json/satta/v1/results?v=" + Date.now();

const API_URL =
  "https://king.sattaapi.com/wp-json/satta/v1/results";

const apiData = {
  api_key: "kLmqLQFPNH88",
  domain_key: "iIDyhh3REFs5g4Yx",
  domain: "https://a7-king.vercel.app",
};

// Global cache
let lastSuccessfulResponse: any = null;

export async function GET() {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiData),
      cache: "no-store",
    });

    const data = await response.json();

    const hasValidData =
      data?.results?.data &&
      Array.isArray(data.results.data) &&
      data.results.data.length > 0;

    if (hasValidData) {
      // Save latest successful response
      lastSuccessfulResponse = data;

      return NextResponse.json(data);
    }

    // API returned empty data, use previous success
    if (lastSuccessfulResponse) {
      return NextResponse.json(lastSuccessfulResponse);
    }

    return NextResponse.json(data);
  } catch (error: any) {
    // API failed completely, use previous success
    if (lastSuccessfulResponse) {
      return NextResponse.json(lastSuccessfulResponse);
    }

    return NextResponse.json(
      {
        success: false,
        message: "Unable to fetch data",
        error: error?.message,
      },
      { status: 500 }
    );
  }
}