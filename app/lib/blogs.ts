// lib/mockBlogs.js

export type Blog = {
  id: number;
  title: string;
  date: string;
  tags: string[];
};

export const getBlogs = (): Promise<Blog[]> => {
  return new Promise<Blog[]>((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          title: "What is Shri Ganesh Satta King ?",
          date: "May 9",
          tags: [
            "shriganeshsattaking",
            "playbajar",
            "playbazaar",
            "sattaking",
          ],
        },
        {
          id: 2,
          title: "How to Play Kalyan Matka Chart ?",
          date: "May 10",
          tags: ["kalyanchart", "matkatips", "playbajar"],
        },
        {
          id: 3,
          title: "Satta Gali Leak Jodi Calculation",
          date: "May 12",
          tags: ["galileaknumber", "leakjodi", "sattakinggali"],
        },
      ]);
    }, 800);
  });
};