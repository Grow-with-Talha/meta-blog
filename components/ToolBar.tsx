"use client";
import { type Editor } from "@tiptap/react";
import {
  Bold,
  Italic,
  Strikethrough,
  List,
  ListOrdered,
  Heading2,
  Heading1,
} from "lucide-react";
import { Toggle } from "./ui/toggle";
const ToolBar = ({ editor }: { editor: Editor | null }) => {
  if (!editor) {
    return null;
  }
  return (
    <div className="border border-input bg-transparent rounded-br-sm w-full h-auto">
      <Toggle
        size={"lg"}
        variant={"default"}
        pressed={editor.isActive("heading", { level: 1 })}
        onPressedChange={() =>
          editor.chain().focus().toggleHeading({ level: 1 }).run()
        }
      >
        <Heading1 className="h-8 w-8" />
      </Toggle>
      <Toggle
        size={"lg"}
        variant={"default"}
        pressed={editor.isActive("heading", { level: 2 })}
        onPressedChange={() =>
          editor.chain().focus().toggleHeading({ level: 2 }).run()
        }
      >
        <Heading2 className="h-8 w-8" />
      </Toggle>
      <Toggle
        size={"lg"}
        variant={"default"}
        pressed={editor.isActive("bold")}
        onPressedChange={() => editor.chain().focus().toggleBold().run()}
      >
        <Bold className="h-8 w-8" />
      </Toggle>
      <Toggle
        size={"lg"}
        variant={"default"}
        pressed={editor.isActive("italic")}
        onPressedChange={() => editor.chain().focus().toggleItalic().run()}
      >
        <Italic className="h-8 w-8" />
      </Toggle>
      <Toggle
        size={"lg"}
        variant={"default"}
        pressed={editor.isActive("strike")}
        onPressedChange={() => editor.chain().focus().toggleStrike().run()}
      >
        <Strikethrough className="h-8 w-8" />
      </Toggle>
      <Toggle
        size={"lg"}
        variant={"default"}
        pressed={editor.isActive("bulletList")}
        onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
      >
        <List className="h-8 w-8" />
      </Toggle>
      <Toggle
        size={"lg"}
        variant={"default"}
        pressed={editor.isActive("orderedList")}
        onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <ListOrdered className="h-8 w-8" />
      </Toggle>
    </div>
  );
};

export default ToolBar;
