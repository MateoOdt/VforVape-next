import { z } from "zod";
import { connectionSchema } from "@/lib/validations/admin";

export type ConnectionFormValues = z.infer<typeof connectionSchema>;