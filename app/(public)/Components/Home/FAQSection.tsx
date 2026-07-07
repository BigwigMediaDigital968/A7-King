import React from "react";

interface InfoBlock {
  heading: string;
  description: string;
}

export default function FAQSection() {
  const infoBlocks: InfoBlock[] = [
    {
      heading: "What is a7satta ?",
      description:
        "A7satta official (a7 satta) is a web platform / website which is popular for publishing various satta king games results as they are announced. There are thousands of websites which shows satta results but they lack of consistency and trustworthy result while a7satta.com is a constantly publish satta king games result everyday which makes it reliable platform for satta king players. Also a7satta.com provides full year satta king record chart which is crucial for satta players for analyzing or predicting upcoming satta results.",
    },
    {
      heading: "What are famous satta king games on a7satta.com ?",
      description:
        "There are many games which results are published every day which are delhi bazar satta king , faridabad satta king ,satta shree ganesh which is also called sg satta king disawer satta king and ghaziabad satta. These games monthly chart which includes shree ganesh chart can be seen on a7satta.com home page .",
    },
    {
      heading: "Do A7satta.com publishes DELHI SATTA RESULT ?",
      description:
        "Yes , Delhi satta is one of the popular game which is played in Indian continent ,it is also called as dl bazar satta or db satta, It is named on India's capital city which is New Delhi , some also called it new delhi satta or dl satta . Keep remember in mind that still the origins of the game yet unknown. A7satta.com shows delhi satta results as soon as it published. Usual Time for delhi satta result is 03:15 PM everyday where actual result can be late upto 5-10 minutes depends upon receiving information of results. Please bear in mind that a7satta.com collects results from public groups.",
    },
    {
      heading: "Real-Time Updates on A7SATTA Games",
      description:
        "In the fast-paced world of satta, timing is crucial. A7satta.com recognizes this and ensures real-time updates on results and related information. Staying ahead of the curve, a7satta keeps enthusiasts informed and engaged.",
    },
  ];

  return (
    <div className="w-full bg-white font-sans select-none">
      <div className="w-full flex flex-col">
        {infoBlocks.map((block, idx) => (
          <div key={idx} className="w-full">
            {/* Bright Yellow Heading Bar */}
            <div className="w-full bg-[#ffd200] py-3.5 px-4 text-center border-b border-black/10">
              <h2 className="text-black font-semibold text-sm sm:text-lg md:text-xl tracking-wide">
                {block.heading}
              </h2>
            </div>

            {/* Clean White Description Content Box */}
            <div className="w-full bg-white py-5 px-4 md:px-6 max-w-8xl mx-auto">
              <p className="text-black font-medium text-xs sm:text-base leading-relaxed text-justify md:text-left tracking-normal">
                {block.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}