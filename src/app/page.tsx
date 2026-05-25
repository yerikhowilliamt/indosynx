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

  const testAI = useMutation(trpc.testAI.mutationOptions({
    onSuccess: () => {
      toast.success("AI Job queued");
    }
  }));
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
      <div className="max-w-md p-4 flex flex-col gap-y-4">
        <Button
          onClick={() => testAI.mutate()}
          disabled={testAI.isPending}
          className="rounded-md cursor-pointer"
        >
          Test AI
        </Button>
        <Button
          onClick={() => create.mutate()}
          disabled={create.isPending}
          className="rounded-md cursor-pointer"
        >
          Create Workflow
        </Button>
        <LogoutButton />
      </div>
    </div>
  );
}
