import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";

const Footer = () => {
  return (
    <div className=" mt-auto  dark:bg-[#141624] border-t-2 border bg-[#F6F6F7]  w-full">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center p-24 justify-between gap-2 ">
        <div className="flex flex-col gap-2  p-10">
          <h2 className="font-xl font-bold">About</h2>
          <div className="w-[100px] h-[100px]" style={{ width: "170px" }}>
            <p className="text-muted-foreground text-xs ">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam
            </p>
          </div>
          <div className="flex items-center  gap-2">
            <span className="font-bold">Email: </span>{" "}
            <span className="text-muted-foreground text-xs">
              growwithtalha2@gmail.com
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-bold">location: </span>{" "}
            <span className="text-muted-foreground text-xs">
              Pakistan
            </span>
          </div>
          <div className="">
          <Image src={"/Logo.png"} alt='hello' height={150} width={150} className='block dark:hidden' />
        <Image src={"/Logo-dark.png"} alt='hello' height={150} width={150} className='hidden dark:block' />
          </div>
        </div>
        <div className=" flex flex-col items-center gap-4 bg-[#242535] p-10 rounded-sm" >
          <h1 className="text-xl text-center capitalize">weekly newsletter</h1>
          <p className="text-muted-foreground">Get blog articles and offers via email</p>
          <div className="flex flex-col gap-3">
            <input type="text" className=" border-none rounded-sm px-4 py-4 " placeholder="enter your email here "/>
            <Button variant={"secondary"}className="bg-[#4B6BFB]" >
              Subscribe
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
