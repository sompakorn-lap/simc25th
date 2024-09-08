import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useGetQuestion(questionId: string) {
  return useQuery({
    queryKey: ["question", questionId],
    queryFn: async () => {
      if (!questionId) return null;
      const res = await axios.get(`/api/exam/question/${questionId}`);
      return res.data;
    },
  });
}
