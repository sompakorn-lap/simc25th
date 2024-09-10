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

export function useGetQuestionList() {
  return useQuery({
    queryKey: ["question_list"],
    queryFn: async () => {
      const res = await axios.get(`/api/exam/question/list`);
      return res.data;
    },
  });
}
