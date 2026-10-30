import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import profileService from "@/Service/profile.service";
import { toast } from "sonner";

export const useProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: () => profileService.getProfile(),
  });
};

export const useProfileUpdate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: any) => profileService.updateProfile(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      queryClient.invalidateQueries({ queryKey: ["auth", "me"] });
      toast.success("Profile updated successfully");
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to update profile");
    },
  });
};
