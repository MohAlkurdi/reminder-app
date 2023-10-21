"use client";
import { Task } from "@prisma/client";
import { Checkbox } from "./ui/checkbox";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { deleteTask, setTaskToDone, updateTask } from "@/action/task";
import { Button } from "./ui/button";
import { EditIcon, TrashIcon } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "./ui/use-toast";
import EditTaskDialog from "./EditTaskDialog";

function getExpirationColor(expiresAt: Date) {
  const days = Math.floor(expiresAt.getTime() - Date.now()) / 1000 / 60 / 60;

  if (days < 0) return "text-gray-300 dark:text-gray-400";

  if (days <= 3 * 24) return "text-red-500 dark:text-red-400";
  if (days <= 7 * 24) return "text-orange-500 dark:text-orange-400";
  return "text-gree-500 dark:text-green-400";
}

function TaskCard({ task }: { task: Task }) {
  const [isLoading, startTransition] = useTransition();
  const [showCreateModal, setShowCreateModal] = useState(false);

  const removeTask = async () => {
    try {
      await deleteTask(task.id);
      toast({ title: "Success", description: "Collection has been deleted" });
      router.refresh();
    } catch (e) {
      toast({
        title: "Failure",
        description:
          "Something went wrong while deleting your collection, Please try again later",
        variant: "destructive",
      });
    }
  };

  const router = useRouter();
  return (
    <>
      <EditTaskDialog
        open={showCreateModal}
        setOpen={setShowCreateModal}
        task={task}
      />

      <div className="flex items-start gap-2">
        <Checkbox
          id={task.id.toString()}
          className="h-5 w-5"
          checked={task.done}
          disabled={task.done || isLoading}
          onCheckedChange={() => {
            startTransition(async () => {
              await setTaskToDone(task.id);
              router.refresh();
            });
          }}
        />
        <label
          htmlFor={task.id.toString()}
          className={cn(
            "text-sm font-medium leading-none decoration-1 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:decoration-white",
            task.done && "line-through",
          )}
        >
          {task.content}
          {task.expiersAt && (
            <p
              className={cn(
                "text-xs text-neutral-500 dark:text-neutral-400",
                getExpirationColor(task.expiersAt),
              )}
            >
              {format(task.expiersAt, "dd/MM/yyyy")}
            </p>
          )}
        </label>

        <div className="flex flex-grow justify-end gap-2">
          {isLoading ? (
            <div className="text-sm">Deleting ...</div>
          ) : (
            <>
              <Button
                size={"icon"}
                variant={"ghost"}
                onClick={() => setShowCreateModal(true)}
              >
                <EditIcon size={16} />
              </Button>

              <Button
                size={"icon"}
                variant={"ghost"}
                onClick={() => startTransition(removeTask)}
              >
                <TrashIcon size={16} />
              </Button>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default TaskCard;
