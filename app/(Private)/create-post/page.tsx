"use client";
import { CreatePost, uploadFeaturedImage } from "@/actions/Post";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import TipTap from "@/components/TipTap";

import { useUser } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { SingleImageDropzone } from "@/components/UploadDropZone";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { HardDriveUpload, Loader2, Save } from "lucide-react";
import { Spinner } from "@/components/Spinner";
const CreatePostPage = () => {
  const router = useRouter();
  const [File, setFile] = useState<File>();
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const PostSchema = z.object({
    postTitle: z.string().min(15).max(300, { message: "Title is to Short" }),
    content: z.string(),
    isPublished: z.boolean().default(false),
    tag: z.string().default("No Tag"),
  });

  const theform = useForm<z.infer<typeof PostSchema>>({
    resolver: zodResolver(PostSchema),
    mode: "onChange",
  });
  const handlePublish = async (values: z.infer<typeof PostSchema>) => {
    const currentDateISOString: string = new Date().toISOString();
    const currentDate: Date = new Date(currentDateISOString);
    let ImgUrl;
    if (File) {
      const { content, isPublished, postTitle, tag } = values;
      const imgpromise = uploadFeaturedImage(File);
      setIsLoading(true);
      imgpromise
        .then(async (res) => {
          console.log(res);
          ImgUrl = res.href;
          await CreatePost({
            postTitle: postTitle,
            Content: content,
            authorId: user?.id,
            createdAt: currentDate,
            isPublished: isPublished,
            featuredImage: ImgUrl,
            authorImg: user?.imageUrl,
            authorName: user?.firstName,
            tag: tag,
          });
        })
        .then(() => {
          toast.success("Post saved successfully!");
          router.push("/myprofile");
          setTimeout(() => {
            theform.setValue("postTitle", "");
            theform.setValue("content", "");
            theform.setValue("isPublished", false);
          }, 500);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error(error);
          toast.error("Failed to create post.");
          setIsLoading(false);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  return (
    <div className="w-full h-full  flex items-center justify-center ">
      <div className="bg-transparent mt-9 p-10 rounded-md w-full mx-10">
        <Label className="text-3xl mb-2">Featured Image *</Label>
        <div className="">
          <SingleImageDropzone
            className="mt-8 mb-8 self-center"
            height={200}
            width={500}
            value={File}
            onChange={(file) => {
              setFile(file);
            }}
          />
        </div>
        <Form {...theform}>
          <form onSubmit={theform.handleSubmit(handlePublish)}>
            <FormField
              control={theform.control}
              name="postTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-3xl mb-2 ">PostTitle *</FormLabel>
                  <FormControl>
                    <Input
                      className="w-full"
                      {...field}
                      placeholder="Enter your post title"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 font-extrabold p-2" />
                </FormItem>
              )}
            />
            <FormField
              control={theform.control}
              name="tag"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-3xl mb-2 ">Tag</FormLabel>
                  <FormControl>
                    <Input
                      className="w-full"
                      {...field}
                      placeholder="Enter your post title"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 font-extrabold p-2" />
                </FormItem>
              )}
            />
            <FormField
              control={theform.control}
              name="content"
              render={({ field }) => (
                <FormItem className="mt-10">
                  <FormLabel className="text-3xl ">Content *</FormLabel>
                  <FormControl>
                    <TipTap content={field.value} onChange={field.onChange} />
                  </FormControl>
                  <FormMessage className="text-red-500 font-extrabold p-2" />
                </FormItem>
              )}
            />
            <div className="w-full flex gap-3 items-center justify-evenly mt-5">
              <Button
              disabled={isLoading}
                className="w-full gap-2 flex items-center"
                type="submit"
                onClick={() => theform.setValue("isPublished", false)}
                variant={"outline"}
              >
                {!isLoading ? <Save /> : <Loader2 className="animate-spin w-4 h-4 text-white" />}
                Save as Draft
              </Button>
              <Button
                disabled={isLoading}
                className="w-full gap-2 flex items-center"
                type="submit"
                onClick={() => theform.setValue("isPublished", true)}
              >
                {!isLoading ? <HardDriveUpload /> : <Loader2 className="animate-spin w-4 h-4 text-white" />}
                Publish
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CreatePostPage;
