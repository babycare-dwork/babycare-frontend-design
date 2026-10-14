import { PageParams, QUERY_STALE_TIME } from "@/config/app-constant";
import babyService from "@/Service/baby.service";
import { InfantCalculatorPayload } from "@/types/infant.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

interface InfantCalculatorParams {
  head_circumference: number;
  weight: number;
  height: number;
  infant_id: number;
}

export function useGetInfantCalculatorHistory(
  infantId: number,
  params?: PageParams,
) {
  return useQuery({
    queryKey: ["infant-history-calculation", infantId, params],
    queryFn: () => babyService.getInfantCalculatorHistory(infantId, params),
  });
}

export function useInfantCalculator(infantId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: InfantCalculatorPayload) => {
      const res = await babyService.infantCalculator(payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["infant-chart", infantId] });
      queryClient.invalidateQueries({
        queryKey: ["infant-history-calculation", infantId],
      });
    },
  });
}

export const useGetInfantChart = (infantId: number, indicator: string) => {
  return useQuery({
    queryKey: ["infant-chart", infantId, indicator],
    queryFn: () => babyService.getInfantChart(infantId, indicator),
    staleTime: QUERY_STALE_TIME,
    retry: 2,
  });
};
