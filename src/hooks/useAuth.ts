import {useQuery} from "@tanstack/react-query";
import {authService} from "@/Service/auth.service";

export interface LoggedInUser {
    id: number
    uuid: string
    name: string
    email: string
    phone?: string
    address?: string
    media?: string
    cart_item_count: number
    favourate_item_count: number
}

export interface LoggedInUserResponse {
    status: boolean;
    data: LoggedInUser;
    message: string;
}

export const useAuth = () => {
    const {data, isLoading, error ,refetch} = useQuery<LoggedInUserResponse | null, Error>({
        queryKey: ["auth", "me"],
        queryFn: async () => {
            // Logged out: no token, so don't ask the API (it would answer 401).
            if (!localStorage.getItem("_baby")) return null;
            try {
                return await authService.getLoggedInUser();
            } catch (error: any) {
                if (error?.status === 401) {
                    // Expired or revoked token — treat as logged out.
                    localStorage.removeItem("_baby");
                    return null;
                }
                throw error;
            }
        },
        retry: false,
        refetchOnWindowFocus: true,
        refetchOnMount: true,
    });

    return {
        user: data?.data,
        isLoading,
        error: error?.message || error,
        isAuthenticated: !!data?.data,
        refetchAuth: refetch,

    };
};
