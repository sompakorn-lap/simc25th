import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useGetSubmission(questionSet: string) {
  return useQuery({
    queryKey: ["submission", questionSet],
    queryFn: async () => {
      const res = await axios.get(`/api/exam/submission/${questionSet}`);
      return res.data;
    },
  });
}
