"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ModeToggle } from "../ui/ThemeSwitcher";
import { UserButton, useUser } from "@clerk/nextjs";
import { Spinner } from "../Spinner";
import { Button } from "../ui/button";
import { motion } from "framer-motion";
import { Cross, Menu, X } from "lucide-react";

const Navbar = () => {
  const { isSignedIn, isLoaded } = useUser();
  const [state, setState] = useState(false);

  return (
    <>
      <nav className="flex items-center justify-between p-10 relative">
        <Link href={"/"}>
          <Image
            src={"/Logo.png"}
            alt="hello"
            height={150}
            width={150}
            className="block dark:hidden"
          />
          <Image
            src={"/Logo-dark.png"}
            alt="hello"
            height={150}
            width={150}
            className="hidden dark:block"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="md:flex lg:flex items-center gap-4 hidden">
          <Link href={"/create-post"}>
            <Button variant={"outline"} className="bg-blue-700 text-white">
              Create Post
            </Button>
          </Link>
          <Link href={"/myprofile"}>
            <Button variant={"outline"} className="bg-blue-700  text-white">
              Profile
            </Button>
          </Link>
          <UserButton />
          <ModeToggle />
        </div>

        <div className="md:hidden">
          <Button
            className="outline-none p-2 rounded-md focus:border-gray-400 focus:border"
            variant={"ghost"}
            onClick={() => setState(!state)}
          >
            <Menu className="text-white" />
          </Button>
        </div>
      </nav>
      {/* mobile navigation */}
      <motion.div
        initial={{ x: 1000, opacity: 0 }}
        animate={{ x: state ? 0 : 1000, opacity: state ? 1 : 0 }}
        transition={{ duration: 0.5, ease: "easeIn" }}
        className={`h-full absolute flex-col top-0 right-0 bg-secondary z-50 w-[60%] ${
          state ? "block" : "hidden"
        }`}
      >
        <X className="absolute right-2 top-2" onClick={() => setState(false)} />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: state ? 1 : 0 }}
          className="w-full bg-secondary flex items-center justify-center gap-4 flex-col h-full"
        >
          <Link href={""} className="block py-2 text-white">
            Home
          </Link>
          <Link href={""} className="block py-2 text-white">
            About
          </Link>
          <Link href={""} className="block py-2 text-white">
            Contact
          </Link>
          {!isLoaded ? (
            <Spinner size={"default"} />
          ) : (
            <div>
              {!isSignedIn ? (
                <Link href={"/sign-up"}>
                  <Button>SignIn</Button>
                </Link>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="flex gap-4 flex-col items-center justify-center"
                >
                  <Link href={"/create-post"}>Create Post</Link>
                  <Link href={"/myprofile"}>Profile</Link>
                </motion.div>
              )}
            </div>
          )}
        </motion.div>
      </motion.div>
    </>
  );
};

export default Navbar;
