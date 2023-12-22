"use client";
/**
 * v0 by Vercel.
 * @see https://v0.dev/t/n56SDiQiKMp
 */
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import parse from "html-react-parser"
import Link from "next/link";
import { CardHeader, CardContent, Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { getPostByUserId } from "@/actions/Post";
import dayjs from "dayjs";
import cheerio from "cheerio"
import { useRouter } from "next/navigation";

const MyProfilePage = () => {
  const { user } = useUser();
  const [data, setData] = useState<any>();
  const router = useRouter()
  useEffect(() => {
    const getData = async () => {
      try {
        if (user?.id) {
          const promise = await getPostByUserId(user.id);
          setData(promise);
        } else {
          // Handle the case where user?.id is undefined
          console.log("User ID is undefined");
        }
      } catch (error) {
        // Handle any errors from getPostByUserId
        console.error(error);
      }
    };
  
    getData();
  }, [user]);
  console.log(data);
  function createSlug(text: string, maxLength = 50) {
    const cleanedText = text
      .trim()
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .slice(0, maxLength);
  
    return cleanedText;
  }
  return (
    <>
      <div className="flex flex-col items-center py-10">
        <Avatar className="h-24 w-24 mb-4">
          <AvatarImage alt="User Avatar" src={user?.imageUrl} />
          <AvatarFallback>JP</AvatarFallback>
        </Avatar>
        <h1 className="text-2xl font-bold">{user?.fullName}</h1>
        <p className="text-gray-500 dark:text-gray-400">
          {user?.primaryEmailAddress?.emailAddress}
        </p>
      </div>
      <div className="px-6">
        <h2 className="text-xl font-semibold mb-2">Blog Posts</h2>
        <div className="space-y-6 mt-7">
          {data?.documents.map((post: any) => {
            const createdAt = dayjs(post["createdAt"]).format("DD-MMM-YYYY")
            const $ = cheerio.load(post["Content"]); // Load HTML content using cheerio
            const textContent = $('body').text(); // Extract text content using cheerio
            const slug = createSlug(textContent, 300);
            let urlTitle = post["PostTitle"].replace(/ /g, "-");
            return (
              <Card key={post["$id"]}>
            <CardHeader>
              <h3 className="text-lg font-semibold">{post["PostTitle"]}</h3>
              <p className="text-gray-500 dark:text-gray-400">
               {createdAt}
              </p>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 dark:text-gray-300 truncate w-full">
                {slug}
              </p>
            </CardContent>
           <Link href={`/post/${urlTitle}/${post["$id"]}`}>
              <Button variant={"secondary"} className="mt-4 m-3">
                Read more
              </Button>
           </Link>
          </Card>
            )
          })}
          
        </div>
      </div>
    </>
  );
};
export default MyProfilePage;
