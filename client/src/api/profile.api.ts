import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export function useGetProfile() {
  return useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const res = await axios.get("/api/profile");
      return res.data;
    },
  });
}

export function useUpdateProfile() {
  return useMutation({
    mutationFn: async (data: any) => {
      return await axios.put("/api/profile", data);
    },
  });
}

export function useSubmitProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: any) => {
      return await axios.put("/api/profile/submit", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
}

export function useGetProfileByUserId(userId: string) {
  return useQuery({
    queryKey: ["profile", userId],
    queryFn: async () => {
      const res = await axios.get(`/api/profile/${userId}`);
      return res.data;
    },
  });
}

export function useApproveProfileByUserId(userId: string) {
  return useMutation({
    mutationFn: async () => {
      const res = await axios.patch(`/api/profile/approve/${userId}`);
      return res.data;
    },
  });
}
