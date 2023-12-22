import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardFooter,
} from "./ui/card";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import dayjs from "dayjs";
const BlogPostCard = ({
  imgurl,
  tag,
  title,
  createdAt,
  authorName,
  authorImg,
}: {
  imgurl: string;
  tag: string;
  title: string;
  createdAt: string;
  authorName: string;
  authorImg: string;
}) => {
  return (
    <Card className="flex flex-col gap-2 w-96 h-[31rem] relative">
      <CardHeader className="h-[260px] w-[380px] flex items-center justify-center relative mx-auto my-2">
        <div className="absolute inset-0 ">
          <Image
            src={imgurl}
            alt={title}
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            className="rounded-lg overflow-hidden"
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="bg-[#4b6bfb42] rounded-sm w-fit p-1 text-sm text-[#4B6BFB]">
          {tag}
        </div>
        <CardTitle className="mt-2 text-3xl">{title}</CardTitle>
      </CardContent>
      <CardFooter className="flex items-center justify-between mb-1 absolute bottom-0">
        <div className="flex items-center justify-center gap-2 ">
          <Avatar className="flex">
            <AvatarImage src={authorImg} />
            <AvatarFallback>TA</AvatarFallback>
          </Avatar>
          <p className="">{authorName}</p>
        </div>
        <p className="ml-36">{dayjs(createdAt).format("DD-MMM-YYYY")}</p>
      </CardFooter>
    </Card>
  );
};

export default BlogPostCard;
