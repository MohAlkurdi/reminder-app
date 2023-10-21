"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import CreateCollectionSidebar from "./CreateCollectionSidebar";

function CreateCollectionBtn() {
  const [open, setOpen] = useState(false);
  const handleOpenChange = (open: boolean) => setOpen(open);

  return (
    <div className="w-full rounded-md bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-[1px]">
      <Button
        variant={"outline"}
        className="w-full bg-white dark:bg-neutral-950 dark:text-white"
        onClick={() => setOpen(true)}
      >
        <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent hover:to-orange-800">
          Create collection
        </span>
      </Button>
      <CreateCollectionSidebar open={open} onOpenChange={handleOpenChange} />
    </div>
  );
}

export default CreateCollectionBtn;
