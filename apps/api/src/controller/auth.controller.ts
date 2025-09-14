import { Request, Response } from "express";

export const singup = async (req: Request, res: Response) => {
  return res.json({
    message: "signed up succesful",
  });
};
