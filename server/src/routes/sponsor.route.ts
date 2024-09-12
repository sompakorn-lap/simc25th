import prisma from "@/libs/prisma/prisma";
import { NextFunction, Request, Response, Router } from "express";

const sponsorRoute = Router();

sponsorRoute.get(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const sponsor = await prisma.sponsor.findMany();
      return res.status(200).json(sponsor);
    } catch (err) {
      next(err);
    }
  }
);

export default sponsorRoute;
