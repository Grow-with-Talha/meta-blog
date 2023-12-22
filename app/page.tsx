"use client";
import { getAllPosts } from "@/actions/Post";
import HeroSection from "@/components/Homepage/HeroSection";
import React, { useEffect, useState } from "react";
import BlogPostCard from "@/components/BlogPostCard";
import { motion } from "framer-motion";
import { Spinner } from "@/components/Spinner";
import Link from "next/link";
const HomePage = () => {
  const [data, setData] = useState<any>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postsData = await getAllPosts();
        setData(postsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="max-w-7xl mx-auto">
      <HeroSection />
      <div className="mt-28 mb-8">
        <h1 className="text-3xl m-4 font-bold">Latest Posts</h1>
        <div className="flex flex-wrap justify-center md:justify-start  gap-4">
          {!data && (
            <div className="flex items-center justify-center w-full h-96">
              <Spinner size={"icon"} />
            </div>
          )}
          {data?.documents?.map((post: any) => {
            let urlTitle = post["PostTitle"].replace(/ /g, "-");
            return (
              <motion.div
                // onClick={() => {
                //   router.push(`/post/${urlTitle}/${post["$id"]}`);
                // }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.99 }}
                key={post["$id"]}
                className=""
              >
                <Link href={`/post/${urlTitle}/${post["$id"]}`}>
                  <BlogPostCard
                    createdAt={post["$createdAt"]}
                    imgurl={post["Featured-Image"]}
                    title={post["PostTitle"]}
                    authorImg={post["AuthorImg"]}
                    authorName={post["authorName"]}
                    tag={post["tag"]}
                  />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HomePage;
