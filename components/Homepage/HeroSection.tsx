import React from "react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const HeroSection = () => {
  return (
    <div className="flex relative">
      <Image
        src={"/Image.png"}
        alt="helo"
        width={1216}
        height={600}
        loading="lazy"
      />
      <div className="w-[16rem] h-[10rem]  lg:w-[37rem] lg:h-[19rem] md:w-[30rem] md:h-[15rem] sm:w-[21rem] sm:h-[16rem] rounded-lg p-7 bg-background absolute gap-3 shadow-2xl -bottom-16 ml-16">
        <div className="bg-[#4B6BFB] rounded-sm w-fit p-1 text-sm md:text-md lg:text-xl text-white">
          technology
        </div>
        <h1 className="mt-2 text-sm lg:text-3xl font-bold md:text-xl sm:text-xl">
          The Impact of Technology on the Workplace: How Technology is Changing
        </h1>
        <div className="md:flex hidden sm:flex lg:flex  items-center justify-between mt-16">
          <div className="flex gap-2 items-center justify-center">
            <Avatar className="flex items-center justify-center ">
              <AvatarImage
                src={"https://avatars.githubusercontent.com/u/124599?v=4"}
              />
              <AvatarFallback>TA</AvatarFallback>
            </Avatar>
            <p className="">Talha ali</p>
          </div>
          <p className="self-center">10/12/24</p>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
