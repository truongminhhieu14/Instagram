"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function ImageShowLogin() {
  const [currentIndex, setCurrentIndex] = useState(0);

  //   const imageShow = ["login1.png", "login2.png", "login3.png", "login4.png"];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        if (prevIndex === 3) {
          //length of array iamge show login in login folder
          return 0;
        } else {
          return prevIndex + 1;
        }
      });
    }, 1000);

    // Cleanup function to clear interval when component unmounts
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="bg-no-repeat bg-cover bg-bg-login w-[350px] min-h-[500px] relative">
      <Image
        src={`/login/login${currentIndex + 1}.png`}
        alt="image-login"
        className="object-cover absolute top-4 right-7"
        width="200"
        height="450"
      />
    </div>
  );
}
