import z from "zod";

export const postSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters" }),
  content: z
    .string()
    .min(3, { message: "Content must be at least 3 characters" }),
  category: z
    .array(
      z.object({
        value: z.string().min(1, { message: "Members must be at least 1" }),
        label: z.string().min(1, { message: "Members must be at least 1" }),
      })
    )
    .min(1, { message: "Category ID must be at least 1 characters" }),
  attatchments: z
    .array(
      z.object({
        url: z.string(),
        originalName: z.string(),
        mimetype: z.string(),
      })
    )
    .optional(),
});

export const updatePostSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title must be at least 3 characters" })
    .optional(),
  content: z
    .string()
    .min(3, { message: "Content must be at least 3 characters" })
    .optional(),
  category: z
    .array(
      z.object({
        value: z.string().min(1, { message: "Members must be at least 1" }),
        label: z.string().min(1, { message: "Members must be at least 1" }),
      })
    )
    .optional(),
});


export type PostSchemaType = z.infer<typeof postSchema>;
export type UpdatePostSchemaType = z.infer<typeof updatePostSchema>;