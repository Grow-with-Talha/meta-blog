"use client";
import { getPostById } from "@/actions/Post";
import { Spinner } from "@/components/Spinner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import dayjs from "dayjs";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import parse from 'html-react-parser';
import DOMPurify from 'dompurify';

const PostPage = ({
  params,
}: {
  params: { postTitle: string; postId: string };
}) => {
  const [data, setData] = useState<any>();
  const createdAt = dayjs(data?.documents[0]["createdAt"]).format(
    "DD-MMM-YYYY"
  );
  useEffect(() => {
    const fetchData = async () => {
      try {
        const postData = await getPostById(params.postId);
        console.log(postData);
        setData(postData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [params.postId]);
  if (!data?.documents[0]) {
    return (
      <div className="w-[100vw] h-[100vh] flex items-center justify-center">
        <Spinner size={"lg"} />
      </div>
    );
  }
  const cleanContent = DOMPurify.sanitize(data?.documents[0]["Content"]);
  const parsedContent = parse(cleanContent);
  return (
    <div className="m-5 w-full lg:max-w-6xl md:max-w-3xl lg:mx-auto md:mx-auto">
      <div className="bg-[#4B6BFB] capitalize p-3 rounded-sm w-fit text-sm md:text-md lg:text-xl text-white">
        {data?.documents[0]["tag"]}
      </div>
      <div className="text-xl md:text-4xl font-bold  w-full mt-4">
        {data?.documents[0]["PostTitle"]}
      </div>
      <div className="flex gap-4 mt-6">
        <div className="flex items-center gap-4 text-muted-foreground text-sm">
          <Avatar>
            <AvatarImage src={data?.documents[0]["AuthorImg"]} />
            <AvatarFallback>TA</AvatarFallback>
          </Avatar>
          {data?.documents[0]["authorName"]}
        </div>
        <div className="flex items-center text-muted-foreground text-sm">
          {createdAt}
        </div>
      </div>
      <div className="w-full flex items-center justify-center mt-4">
        <div className="w-[50rem] h-[15rem] md:h-[25rem] flex justify-center">
          <Image
            className="w-full h-full object-containF aspect-video"
            objectFit="cover"
            objectPosition="center"
            src={data?.documents[0]["Featured-Image"]}
            alt="featured image"
            width={100}
            height={100}
            unoptimized
            priority
          />
        </div>
      </div>
      <div className="mt-6">
        {parsedContent}
      </div>
    </div>
  );
};

export default PostPage;
