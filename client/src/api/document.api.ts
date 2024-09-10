import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import getFileData from "../utils/getFileData";

export function useUploadDocument() {
  return useMutation({
    mutationFn: async (data: any) => {
      const { transactionImage, transcriptFile, permissionFile } = data as {
        transactionImage: FileList;
        transcriptFile: FileList;
        permissionFile: FileList;
      };
      const [transactionImageData, transcriptFileData, permissionFileData] =
        await Promise.all([
          getFileData(transactionImage[0]),
          getFileData(transcriptFile[0]),
          getFileData(permissionFile[0]),
        ]);
      const res = await axios.post("/api/document", {
        transactionImageData,
        transcriptFileData,
        permissionFileData,
      });
      return res.data;
    },
  });
}

export function useApproveDocumentByUserId(userId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const res = await axios.patch(`/api/document/approve/${userId}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["document", userId] });
    },
  });
}

export function useGetDocumentByUserId(userId: string) {
  return useQuery({
    queryKey: ["document", userId],
    queryFn: async () => {
      const res = await axios.get(`/api/document/${userId}`);
      return res.data;
    },
  });
}

export function useGetSubmittedDocuments() {
  return useQuery({
    queryKey: ["submitted_documents"],
    queryFn: async () => {
      const res = await axios.get("/api/document/submitted_documents");
      return res.data;
    },
  });
}
