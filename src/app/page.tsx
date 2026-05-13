import { caller } from "@/trpc/server";

export default async function Home() {
  const users = await caller.getUsers();
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      {JSON.stringify(users)}
    </div>
  );
}
