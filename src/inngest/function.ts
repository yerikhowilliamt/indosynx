import prisma from "@/lib/db";
import { inngest } from "./client";

export const processTask = inngest.createFunction(
  { id: "process-task", triggers: { event: "app/task.created" } },
  async ({ event, step }) => {
    await step.run("create-workflow", () => {
      return prisma.workflow.create({
        data: {
          name: `workflow-from-inngest`,
        },
      });
    });

    // Fetching the video
    await step.sleep("fetching", "5s");

    // Transcribing the video
    await step.sleep("transcribing", "5s");

    // Sending transcription to AI
    await step.sleep("sending-to-ai", "5s");
  },
);
