import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export function useGetAnswer(questionId: string) {
  return useQuery({
    queryKey: ["answer", questionId],
    queryFn: async () => {
      if (!questionId) return null;
      const res = await axios.get(`/api/exam/answer/${questionId}`);
      return res.data;
    },
  });
}

export function useUpdateAnswer(questionId: string) {
  return useMutation({
    mutationFn: ({ answer }: any) => {
      return axios.put(`/api/exam/answer/${questionId}`, { answer });
    },
  });
}

export function useSubmitAnswer(questionSet: string, questionId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: any) => {
      return await axios.put(`/api/exam/answer/submit/${questionId}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["submission", questionSet] });
    },
  });
}
