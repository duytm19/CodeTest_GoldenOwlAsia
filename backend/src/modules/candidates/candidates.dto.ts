import { z } from "zod";

export const searchCandidateDTO = z.object({
  query: z.object({
    registrationNumber: z
      .string({
        error: (issue) =>
          issue.input === undefined
            ? "This field is required"
            : "Invalid number",
      })
      .length(8, "Registration Number must be exactly 8 characters long"),
  }),
});

export type SearchCandidateInput = z.infer<typeof searchCandidateDTO>;
