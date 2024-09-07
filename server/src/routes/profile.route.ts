import {
  approveProfileByUserId,
  getProfile,
  getProfileByUserId,
  submitProfile,
  updateProfile,
} from "@/controllers/profile.controller";
import { Router } from "express";

const profileRoute = Router();

profileRoute.get("/", getProfile);
profileRoute.put("/", updateProfile);
profileRoute.put("/submit", submitProfile);
profileRoute.get("/:userId", getProfileByUserId);
profileRoute.patch("/:userId", approveProfileByUserId);

export default profileRoute;
