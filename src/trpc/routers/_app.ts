import { z } from "zod";
import { baseProcedure, createTRPCRouter, protectedProcedure } from "../init";
import prisma from "@/lib/db";
import { inngest } from "@/inngest/client";
import { NextResponse } from "next/server";
export const appRouter = createTRPCRouter({
  getWorkflows: protectedProcedure.query(({ctx}) => {
    return prisma.workflow.findMany();
  }),
  createWorkflow: protectedProcedure.mutation(async () => {
    await inngest.send({
      name: "app/task.created",
      data: { name: "task_002" },
    });

    return { success: true, message: "Job queued" }
  })
});
// export type definition of API
export type AppRouter = typeof appRouter;
