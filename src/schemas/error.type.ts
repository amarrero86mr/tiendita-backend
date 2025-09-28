export type TError = {
  status: number;
  msg: string;
  description?: string;
};

export const isTError = (obj: any): obj is TError => {
  return typeof obj === "object" && obj.msg;
};
