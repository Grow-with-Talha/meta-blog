import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Heading from "@tiptap/extension-heading";
import ToolBar from "./ToolBar";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import BulletList from "@tiptap/extension-bullet-list";

const TipTap = ({
  content,
  onChange,
}: {
  content: string;
  onChange: (richtext: string) => void;
}) => {
  const editor = useEditor({
    extensions: [StarterKit.configure({
      history: false,
    }),
    Heading.configure({
      levels: [1,2],
      HTMLAttributes: {
        class: `text-3xl font-bold`,
      },
    }),
    OrderedList.configure({
      HTMLAttributes: {
        class: "list-decimal ml-2"
      }
    }),
    BulletList.configure({
      HTMLAttributes: {
        class: "list-disc ml-2"
      }
    }),
    ListItem,
  ],
    content: content,
    editorProps: {
      attributes: {
        class:
          "rounded-md border h-[750px] text-black  border-input bg-white p-5 disabled:cursor-not-allowed disabled:opacity-50 overflow-auto",
      },
    },
    onUpdate: ({ editor } : {editor: any}) => {
        onChange(editor.getHTML())
    }
  });

  return (
    <div className="flex flex-col justify-stretch h-[800px] bg-black">
        <ToolBar editor={editor} />
        <EditorContent editor={editor}  />
    </div>
  );
};

export default TipTap;
