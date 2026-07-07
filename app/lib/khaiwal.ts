// app/lib/khaiwal.ts

export type KhaiwalTiming = {
  location: string;
  time: string;
};

export const getKhaiwalTimings = async (): Promise<KhaiwalTiming[]> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return [
    { location: "सदर बाजार", time: "1:30 pm" },
    { location: "ग्वालियर", time: "2:30 pm" },
    { location: "दिल्ली बाजार", time: "2:50 pm" },
    { location: "दिल्ली मटका", time: "3:20 pm" },
    { location: "श्री गणेश", time: "4:20 pm" },
    { location: "आगरा", time: "5:20 pm" },
    { location: "फरीदाबाद", time: "5:50 pm" },
    { location: "अलवर", time: "7:20 pm" },
    { location: "गाज़ियाबाद", time: "8:50 pm" },
    { location: "द्वारका", time: "10:10 pm" },
    { location: "गली", time: "11:20 pm" },
    { location: "दिसावर", time: "1:30 am" },
  ];
};