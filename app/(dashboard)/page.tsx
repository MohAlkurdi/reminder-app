import { Skeleton } from "@/components/ui/skeleton";
import { currentUser } from "@clerk/nextjs";
import { Suspense } from "react";

export default async function Home() {
  return (
    <>
      <Suspense fallback={<WelcomeMsgFallback />}>
        <WelcomeMsg />
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
    <div className="flex w-full">
      <h1 className="text-4xl font-bold">
        Welcome,
        <br /> {user?.firstName}
      </h1>
    </div>
  );
};

const WelcomeMsgFallback = () => {
  return (
    <div className="flex w-full">
      <h1 className="text-4xl font-bold">
        <Skeleton className="w-[150px] h-[36px]" />
        <Skeleton className="w-[150px] h-[36px]" />
      </h1>
    </div>
  );
};
