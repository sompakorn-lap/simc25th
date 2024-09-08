import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

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
      const res = await axios.post("/api/auth/signup", data);
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
