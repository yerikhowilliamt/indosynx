"use client";

import LogoutButton from "@/components/auth/logout-button";
import { Button } from "@/components/ui/button";
import { requireAuth } from "@/lib/auth-utils";
import { useTRPC } from "@/trpc/client";
import { caller } from "@/trpc/server";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export default function Home() {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const { data } = useQuery(trpc.getWorkflows.queryOptions());
  const create = useMutation(
    trpc.createWorkflow.mutationOptions({
      onSuccess: () => {
        toast.success("Job queued");
      },
    }),
  );
  return (
    <div className="flex min-h-screen items-center justify-center flex-col gap-y-6 px-4">
      Protected Server Component
      <div>{JSON.stringify(data, null, 2)}</div>
      <Button
        onClick={() => create.mutate()}
        disabled={create.isPending}
        className="rounded-md cursor-pointer"
      >
        Create Workflow
      </Button>
      <LogoutButton />
    </div>
  );
}
