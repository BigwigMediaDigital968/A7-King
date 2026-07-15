// app/lib/satta.ts

export interface GameRow {
  name: string;
  time: string;
  yesterdayResult: string;
  todayResult: string | "NEW";
}

interface GetSattaParams {
  dateFrom?: string;
  dateTo?: string;
  timing?: string;
}

// app/lib/weeklyResults.ts

export interface WeeklyGameRow {
  game: string;
  results: string[];
}

export const getSatta = async (
  params?: GetSattaParams
): Promise<GameRow[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const data: GameRow[] = [
    {
      name: "SADAR BAZAR",
      time: "1:40 PM",
      yesterdayResult: "21",
      todayResult: "99",
    },
    {
      name: "GWALIOR",
      time: "2:40 PM",
      yesterdayResult: "07",
      todayResult: "19",
    },
    {
      name: "DELHI BAZAR",
      time: "3:15 PM",
      yesterdayResult: "57",
      todayResult: "26",
    },
    {
      name: "DELHI MATKA",
      time: "3:40 PM",
      yesterdayResult: "97",
      todayResult: "NEW",
    },
    {
      name: "SHRI GANESH",
      time: "4:40 PM",
      yesterdayResult: "54",
      todayResult: "NEW",
    },
    {
      name: "AGRA",
      time: "5:30 PM",
      yesterdayResult: "68",
      todayResult: "NEW",
    },
    {
      name: "FARIDABAD",
      time: "6:10 PM",
      yesterdayResult: "19",
      todayResult: "NEW",
    },
    {
      name: "ALWAR",
      time: "7:35 PM",
      yesterdayResult: "23",
      todayResult: "NEW",
    },
    {
      name: "GAZIABAD",
      time: "9:50 PM",
      yesterdayResult: "54",
      todayResult: "NEW",
    },
    {
      name: "DWARKA",
      time: "10:35 PM",
      yesterdayResult: "76",
      todayResult: "NEW",
    },
    {
      name: "GALI",
      time: "11:50 PM",
      yesterdayResult: "50",
      todayResult: "NEW",
    },
  ];

  // Mock filtering
  if (params?.timing) {
    return data.filter((row) =>
      row.time.toLowerCase().includes(params.timing!.toLowerCase())
    );
  }

  return data;
};



export const getWeeklyResults = async (): Promise<{
  table1: WeeklyGameRow[];
  table2: WeeklyGameRow[];
}> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    table1: [
      { game: "SADAR BAZAR", results: ["21", "45", "78", "12", "67", "34", "89"] },
      { game: "GWALIOR", results: ["07", "11", "56", "90", "44", "66", "19"] },
      { game: "DELHI BAZAR", results: ["57", "22", "18", "73", "91", "26", "33"] },
      { game: "DELHI MATKA", results: ["97", "54", "76", "88", "42", "15", "09"] },
      { game: "SADAR BAZAR", results: ["21", "45", "78", "12", "67", "34", "89"] },
      { game: "GWALIOR", results: ["07", "11", "56", "90", "44", "66", "19"] },
      { game: "DELHI BAZAR", results: ["57", "22", "18", "73", "91", "26", "33"] },
      { game: "DELHI MATKA", results: ["97", "54", "76", "88", "42", "15", "09"] },
      { game: "SADAR BAZAR", results: ["21", "45", "78", "12", "67", "34", "89"] },
      { game: "GWALIOR", results: ["07", "11", "56", "90", "44", "66", "19"] },
      { game: "DELHI BAZAR", results: ["57", "22", "18", "73", "91", "26", "33"] },
      { game: "DELHI MATKA", results: ["97", "54", "76", "88", "42", "15", "09"] },

      { game: "GWALIOR", results: ["07", "11", "56", "90", "44", "66", "19"] },
      { game: "DELHI BAZAR", results: ["57", "22", "18", "73", "91", "26", "33"] },
      { game: "DELHI MATKA", results: ["97", "54", "76", "88", "42", "15", "09"] },
      { game: "SADAR BAZAR", results: ["21", "45", "78", "12", "67", "34", "89"] },
      { game: "GWALIOR", results: ["07", "11", "56", "90", "44", "66", "19"] },
      { game: "DELHI BAZAR", results: ["57", "22", "18", "73", "91", "26", "33"] },
      { game: "DELHI MATKA", results: ["97", "54", "76", "88", "42", "15", "09"] },
    ],

    table2: [
      { game: "AGRA", results: ["68", "77", "21", "56", "91", "43", "88"] },
      { game: "FARIDABAD", results: ["19", "24", "87", "65", "12", "44", "70"] },
      { game: "ALWAR", results: ["23", "51", "80", "99", "61", "28", "74"] },
      { game: "GAZIABAD", results: ["54", "90", "37", "42", "16", "73", "85"] },
      { game: "SADAR BAZAR", results: ["21", "45", "78", "12", "67", "34", "89"] },
      { game: "GWALIOR", results: ["07", "11", "56", "90", "44", "66", "19"] },
      { game: "DELHI BAZAR", results: ["57", "22", "18", "73", "91", "26", "33"] },
      { game: "DELHI MATKA", results: ["97", "54", "76", "88", "42", "15", "09"] },
      { game: "SADAR BAZAR", results: ["21", "45", "78", "12", "67", "34", "89"] },
      { game: "GWALIOR", results: ["07", "11", "56", "90", "44", "66", "19"] },
      { game: "DELHI BAZAR", results: ["57", "22", "18", "73", "91", "26", "33"] },
      { game: "DELHI MATKA", results: ["97", "54", "76", "88", "42", "15", "09"] },
      { game: "GWALIOR", results: ["07", "11", "56", "90", "44", "66", "19"] },
      { game: "DELHI BAZAR", results: ["57", "22", "18", "73", "91", "26", "33"] },
      { game: "DELHI MATKA", results: ["97", "54", "76", "88", "42", "15", "09"] },
      { game: "SADAR BAZAR", results: ["21", "45", "78", "12", "67", "34", "89"] },
      { game: "GWALIOR", results: ["07", "11", "56", "90", "44", "66", "19"] },
      { game: "DELHI BAZAR", results: ["57", "22", "18", "73", "91", "26", "33"] },
      { game: "DELHI MATKA", results: ["97", "54", "76", "88", "42", "15", "09"] },
    ],
  };
};

export interface YearlySattaResponse {
  success: boolean;
  data: {
    game: {
      name: string;
      slug: string;
      resultTime: string;
    };
    year: number;
    months: Record<string, Record<number, string | null>>;
  };
}

export const fetchSattaYearlyData = async (
  slug: string,
  year: number
): Promise<YearlySattaResponse> => {
  const response = await fetch(`/api/satta/yearly?slug=${slug}&year=${year}`);
  if (!response.ok) {
    throw new Error("Failed to fetch yearly Satta results");
  }
  return response.json();
};

export interface YearlyGameData {
  game: string;
  slug: string;
  time: string;
  year: number;
  months: Record<string, Record<number, string>>;
}

export interface AllYearlyDataResponse {
  success: boolean;
  range: string;
  year: number;
  data: YearlyGameData[];
}

export const fetchAllYearlyData = async (
  year: number
): Promise<AllYearlyDataResponse> => {
  const response = await fetch(`/api/data?range=yearly&year=${year}`);
  if (!response.ok) {
    throw new Error("Failed to fetch all yearly Satta data");
  }
  return response.json();
};