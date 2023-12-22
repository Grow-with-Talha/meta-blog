// "use server"
import { databases, storage } from "@/appwrite/config";
import { ID } from "@/appwrite/config";
import { Query } from "appwrite";
const databaseId = "658523095511f304a8d8";
const collectionId = "6585231472104faa10cc";
export async function CreatePost({
  postTitle,
  Content,
  createdAt,
  featuredImage,
  authorId,
  isPublished,
  authorName,
  authorImg,
  tag,
}: {
  postTitle: string;
  Content: string;
  createdAt: Date;
  featuredImage: string;
  authorId: string | undefined;
  isPublished: boolean;
  authorName: string | undefined | null;
  authorImg: string | undefined;
  tag?: string;
}) {
  const promise = await databases.createDocument(
    databaseId,
    collectionId,
    ID.unique(),
    {
      Content: Content,
      createdAt: createdAt,
      "Featured-Image": featuredImage,
      "Author-id": authorId,
      "Is-published": isPublished,
      authorName: authorName,
      AuthorImg: authorImg,
      tag: tag,
      PostTitle: postTitle,
    }
  );
  return promise;
}

export async function uploadFeaturedImage(file: File) {
  const promise = await storage.createFile(
    "657d91f9b8990976735a",
    ID.unique(),
    file
  );

  const img = storage.getFilePreview("657d91f9b8990976735a", promise.$id);
  return img;
}

export async function getAllPosts() {
  try {
    const res = await databases.listDocuments(databaseId, collectionId, [
      Query.equal("Is-published", true),
      Query.orderDesc("createdAt"),
    ]);
    return res; // Return the data
  } catch (err) {
    console.error("Error fetching posts:", err);
    throw err; // Rethrow the error to be caught in the component
  }
}

export async function getPostById(id: string) {
  try {
    const res = await databases.listDocuments(databaseId, collectionId, [
      Query.equal("$id", id),
    ]);
    // console.log(res)
    return res;
  } catch (error) {
    console.log(error);
  }
}

export async function getPostByUserId(userId?: string) {
  try {
    if (userId) {
      const res = await databases.listDocuments(databaseId, collectionId, [
        Query.equal("Author-id", userId),
      ]);
      // console.log(res)
      return res;
    }
  } catch (error) {
    console.log(error);
    throw error; // Rethrow the error to handle it in the calling code if needed
  }
}
