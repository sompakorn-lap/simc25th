import {
  approveProfileByUserId,
  getProfile,
  getProfileByUserId,
  getSubmittedProfiles,
  submitProfile,
  updateProfile,
} from "@/controllers/profile.controller";
import { Router } from "express";

const profileRoute = Router();

profileRoute.get("/", getProfile);
profileRoute.put("/", updateProfile);
profileRoute.put("/submit", submitProfile);
profileRoute.get("/submitted_profiles", getSubmittedProfiles);
profileRoute.get("/:userId", getProfileByUserId);
profileRoute.patch("/approve/:userId", approveProfileByUserId);

export default profileRoute;
