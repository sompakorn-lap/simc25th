import {
  approveDocumentByUserId,
  getDocument,
  getDocumentByUserId,
  uploadDocument,
} from "@/controllers/document.controller";
import { Router } from "express";

const documentRoute = Router();

documentRoute.get("/", getDocument);
documentRoute.post("/", uploadDocument);
documentRoute.get("/:userId", getDocumentByUserId);
documentRoute.patch("/approve/:userId", approveDocumentByUserId);

export default documentRoute;
