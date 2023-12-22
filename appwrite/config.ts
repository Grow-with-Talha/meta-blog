import { Client, Account, Databases, ID, Storage } from "appwrite";

export const client = new Client();
client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("65757466458fafb26819");

export const account = new Account(client);
export { ID } from "appwrite";

export const databases = new Databases(client)
export const storage = new Storage(client)
