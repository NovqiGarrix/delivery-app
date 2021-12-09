import { ZodIssue } from "zod";

type ZodErrorReturn = {
    field: string | number;
    message: string;
}
export const createZodError = (issues: ZodIssue[]): Array<ZodErrorReturn> => {
    return issues.map((err) => ({ field: err.path[0], message: err.message }));
}