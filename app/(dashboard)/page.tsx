import CollectionCard from "@/components/CollectionCard ";
import CreateCollectionBtn from "@/components/CreateCollectionBtn";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs";
import { Suspense } from "react";

export default async function Home() {
  return (
    <>
      <Suspense fallback={<WelcomeMsgFallback />}>
        <WelcomeMsg />
      </Suspense>
      <Suspense fallback={<div>Loading ...</div>}>
        <CollectionList />
      </Suspense>
    </>
  );
}

const WelcomeMsg = async () => {
  const user = await currentUser();
  if (!user) {
    return "No user name found";
  }
  return (
    <div className="mb-12 flex w-full">
      <h1 className="text-4xl font-bold">
        Welcome,
        <br /> {user?.firstName}
      </h1>
    </div>
  );
};

const WelcomeMsgFallback = () => {
  return (
    <div className="mb-12 flex w-full">
      <h1 className="text-4xl font-bold">
        <Skeleton className="h-[36px] w-[150px]" />
        <Skeleton className="h-[36px] w-[150px]" />
      </h1>
    </div>
  );
};

const CollectionList = async () => {
  const user = await currentUser();
  const collections = await prisma.collection.findMany({
    include: {
      tasks: true,
    },
    where: {
      userId: user?.id,
    },
  });

  if (collections.length === 0) {
    return (
      <div className="flex flex-col gap-5">
        <Alert>
          <AlertTitle>There are no collection yet</AlertTitle>
          <AlertDescription>
            Create a collection to get started
          </AlertDescription>
        </Alert>

        <CreateCollectionBtn />
      </div>
    );
  }

  return (
    <>
      <CreateCollectionBtn />

      <div className="mt-6 flex flex-col gap-4">
        {collections.map((collection) => (
          <CollectionCard key={collection.id} collection={collection} />
        ))}
      </div>
    </>
  );
};
