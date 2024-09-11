import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useGetApplicantStatus() {
  return useQuery({
    queryKey: ["applicantStatus"],
    queryFn: async () => {
      const res = await axios.get("/api/applicantStatus");
      return res.data;
    },
  });
}
