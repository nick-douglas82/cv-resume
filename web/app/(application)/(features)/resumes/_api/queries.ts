import { useQuery } from "@tanstack/react-query";
import { api } from "@web/lib/api";
import type { Resume } from "../_model/types";

export function useResumes() {
  return useQuery({
    queryKey: ["resumes"],
    queryFn: async () => {
      const res = await api.get<Resume[]>("/resumes");
      return res.data;
    },
  });
}
