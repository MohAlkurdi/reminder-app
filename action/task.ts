"use server";

import prisma from "@/lib/prisma";
import { createTaskSchemaType } from "@/schema/createTask";
import { currentUser } from "@clerk/nextjs";

export async function createTask(data: createTaskSchemaType) {
  const user = await currentUser();

  if (!user) {
    throw new Error("user not found");
  }

  const { collectionId } = data;

  return await prisma.task.create({
    data: {
      userId: user.id,
      content: data.content,
      expiersAt: data.expiresAt,
      Collection: {
        connect: {
          id: collectionId,
        },
      },
    },
  });
}

export async function toggleTaskDoneStatus(id: number) {
  const user = await currentUser();

  if (!user) {
    throw new Error("user not found");
  }

  const task = await prisma.task.findUnique({
    where: {
      id: id,
      userId: user.id,
    },
  });

  if (!task) {
    throw new Error("Task not found");
  }

  const newDoneStatus = !task.done;

  return await prisma.task.update({
    where: {
      id: id,
      userId: user.id,
    },
    data: {
      done: newDoneStatus,
    },
  });
}

export async function deleteTask(id: number) {
  const user = await currentUser();

  if (!user) {
    throw new Error("user not found");
  }

  return await prisma.task.delete({
    where: {
      id: id,
      userId: user.id,
    },
  });
}

export async function updateTask(id: number, content: string, expiresAt: Date) {
  const user = await currentUser();

  if (!user) {
    throw new Error("user not found");
  }

  return await prisma.task.update({
    where: {
      id: id,
      userId: user.id,
    },
    data: {
      content: content,
      expiersAt: expiresAt,
    },
  });
}
