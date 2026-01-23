import { z } from "zod";
import { TaskPriority, TaskStatus } from "../models/task.model";

/* ============================
   HELPERS
============================ */

const objectId = z
  .string()
  .regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId");

/**
 * Accepts:
 * - "65ab..."
 * - { _id: "65ab..." }
 * - null
 */
const assignedToSchema = z.union([
  objectId,
  z.object({
    _id: objectId,
  }),
  z.null(),
]);

/* ============================
   CREATE TASK DTO
============================ */

export const CreateTaskDto = z.object({
  title: z.string().min(1).max(100),
  description: z.string().optional(),

  // optional because UI may allow empty date
  dueDate: z.string().optional(),

  priority: z.nativeEnum(TaskPriority),

  assignedToId: assignedToSchema.optional(),
});

/* ============================
   UPDATE TASK DTO
============================ */

export const UpdateTaskDto = z
  .object({
    title: z.string().min(1).max(100).optional(),
    description: z.string().optional(),

    dueDate: z.string().optional(),

    priority: z.nativeEnum(TaskPriority).optional(),
    status: z.nativeEnum(TaskStatus).optional(),

    assignedToId: assignedToSchema.optional(),
  })
  .refine(
    (data) => Object.keys(data).length > 0,
    {
      message: "At least one field must be updated",
    }
  );

/* ============================
   TYPES
============================ */

export type CreateTaskInput = z.infer<typeof CreateTaskDto>;
export type UpdateTaskInput = z.infer<typeof UpdateTaskDto>;
