"use client";
import { useState } from "react";
import { Button } from "./ui/button";
import CreateCollectionSidebar from "./CreateCollectionSidebar";
const CreateCollectionBtn = () => {
  const [open, setOpen] = useState(false);

  const handleOpenChange = (open: boolean) => setOpen(open);

  return (
    <Button
      variant={"outline"}
      className="dark:text-white w-full dark:bg-neutral-950 bg-white"
      onClick={() => setOpen(true)}
    >
      <span className="bg-gradient-to-r from-pink-500 to-red-400 hover:to-red-800 bg-clip-text text-transparent">
        Create collection
      </span>

      <CreateCollectionSidebar open={open} onOpenChange={handleOpenChange} />
    </Button>
  );
};

export default CreateCollectionBtn;
