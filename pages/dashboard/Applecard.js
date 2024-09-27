"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import { GetLessons } from "@/hooks/getLessons";
import { IconArrowNarrowRight } from "@tabler/icons-react";
import Link from "next/link";
import Router from "next/router";

export function AppleCardsCarouselDemo() {
  const [lessonsloaded, setlessonstate] = useState(false);
  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));
  var LessonData = GetLessons();
  var cool = LessonData[1];
  console.log("Lessondata:", cool?.name);

  var logger;
  for (let i = 0; i < LessonData.length; i++) {
    var logger = LessonData[i];
    if (data.length < LessonData.length) {
      data.push({
        category: LessonData[i]?.paramname,
        title: LessonData[i]?.name,
        src: LessonData[i].imgurl,
        content: (
          <>
            {[...new Array(1).fill(1)].map((_, index) => {
              return (
                <div
                  key={"dummy-content" + index}
                  className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4"
                >
                  <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
                    <span className="font-bold text-neutral-700 dark:text-neutral-200">
                      {LessonData[i]?.name}
                    </span>{" "}
                    {LessonData[i]?.Desc}
                  </p>
                  <Image
                    src={LessonData[i]?.cardimg}
                    alt="Macbook mockup from Aceternity UI"
                    height="1000"
                    width="1000"
                    className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain"
                  />
                </div>
              );
            })}
            {console.log(logger)}
            <Link
              className="relative z-40 h-10 w-10 rounded-full hover:bg-neutral-300 bg-gray-100 flex items-center justify-center disabled:opacity-50"
              href={`/lesson/${logger?.Number}`}
            >
              <IconArrowNarrowRight className="h-6 w-6 text-gray-500" />
            </Link>
          </>
        ),
      });
    }
  }

  return <Carousel items={cards} />;
}

const DummyContent = () => {
  return (
    <>
      {[...new Array(3).fill(1)].map((_, index) => {
        return (
          <div
            key={"dummy-content" + index}
            className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4"
          >
            <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
              <span className="font-bold text-neutral-700 dark:text-neutral-200">
                The first rule of Apple club is that you boast about Apple club.
              </span>{" "}
              Keep a journal, quickly jot down a grocery list, and take amazing
              class notes. Want to convert those notes to text? No problem.
              Langotiya jeetu ka mara hua yaar is ready to capture every
              thought.
            </p>
            <Image
              src="https://assets.aceternity.com/macbook.png"
              alt="Macbook mockup from Aceternity UI"
              height="500"
              width="500"
              className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain"
            />
          </div>
        );
      })}
    </>
  );
};

const data = [];
