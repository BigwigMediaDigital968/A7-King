type GameRow = {
    _id: string;
    slug:string;
  game: string;
  time: string;
  tableNo?: number;
  result: [number | null, number | null];
};

type ApiResponse = {
  success: boolean;
  range: string;
  data: GameRow[];
};

export const hasTimePassed = (timeString: string) => {
  const now = new Date();

  const [time, period] = timeString.split(" ");
  let [hours, minutes] = time.split(":").map(Number);

  if (period === "PM" && hours !== 12) hours += 12;
  if (period === "AM" && hours === 12) hours = 0;

  const gameTime = new Date();
  gameTime.setHours(hours, minutes, 0, 0);

  return now >= gameTime;
};

export const fetchDailyData = async (): Promise<GameRow[]> => {
  const response = await fetch(
    "/api/data?range=daily"
  );

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  const json: ApiResponse = await response.json();

  return json.data;
};