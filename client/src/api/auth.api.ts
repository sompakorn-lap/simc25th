import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import getFileData from "../utils/getFileData";

export function useRefresh() {
  const { data: auth } = useQuery({
    queryKey: ["auth"],
    queryFn: async () => {
      const res = await axios("/api/auth/refresh");
      return res.data;
    },
  });

  return { auth };
}

export function useSignUp() {
  return useMutation({
    mutationFn: async (data: any) => {
      const { citizenImage, ...signUpData } = data as {
        citizenImage: FileList;
      };
      const citizenImageData = await getFileData(citizenImage[0]);
      const res = await axios.post("/api/auth/signup", {
        ...signUpData,
        citizenImageData,
      });
      return res.data;
    },
  });
}

export function useSignIn(signinToken: string) {
  return useQuery({
    queryKey: ["auth"],
    queryFn: async () => {
      const res = await axios.get(`/api/auth/signin/${signinToken}`);
      return res.data;
    },
  });
}
