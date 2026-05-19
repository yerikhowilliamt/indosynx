import LogoutButton from "@/components/auth/logout-button";
import { requireAuth } from "@/lib/auth-utils";
import { caller } from "@/trpc/server";

export default async function Home() {
  await requireAuth();

  const data = await caller.getUsers();
  return (
    <div className="flex min-h-screen flex items-center justify-center flex-col gap-y-6 px-4">
      Protected Server Component
      <div>{JSON.stringify(data, null, 2)}</div>
      <LogoutButton />
    </div>
  );
}
