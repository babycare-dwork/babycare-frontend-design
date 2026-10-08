"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import TextInputField from "@/components/field/TextInputField";
import PasswordInputField from "@/components/field/PasswordInput";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useCallback } from "react";
import { authService } from "@/Service/auth.service";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { useGoogleLogin } from "@react-oauth/google";
import Image from "next/image";

const loginSchema = z.object({
  email: z.email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = useCallback(
    async (data: LoginFormData) => {
      try {
        const response = await authService.login(data);
        localStorage.setItem("_baby", response.data.token);
        toast.success(response.message || "Login successful");
        await queryClient.invalidateQueries({ queryKey: ["auth", "me"] });
        router.push("/products");
      } catch (error: any) {
        toast.error(error?.message || "Login failed");
      }
    },
    [router, queryClient],
  );

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      // console.log("Google Response:", tokenResponse);
      try {
        const response = await authService.googleLogin({
          token: tokenResponse.access_token,
        });
        localStorage.setItem("_baby", response.data.token);
        toast.success("Google login successful");
        await queryClient.invalidateQueries({ queryKey: ["auth", "me"] });
        router.push("/products");
      } catch (error: any) {
        toast.error(error?.message || "Google login failed");
      }
    },
    onError: (errorResponse) => {
      console.log("Google Login Response", errorResponse);
    },
  });

  return (
    <div className="h-fit grid lg:grid-cols-2 items-stretch container mx-auto px-4 sm:px-8">
      <div className="hidden lg:flex flex-col items-center justify-center bg-navy text-on-navy p-6 xl:p-12 relative overflow-hidden rounded-3xl my-6">
        <div className="relative z-10 text-center max-w-md">
          <div className="w-16 h-16 rounded-full bg-sky-soft flex items-center justify-center mb-8 mx-auto">
            <div className="w-6 h-6 rounded-full bg-shield"></div>
          </div>
          <h1 className="text-4xl xl:text-5xl font-extrabold mb-6 text-balance">
            Welcome Back to BabyCare
          </h1>
          <p className="text-lg text-on-navy/80 leading-relaxed">
            Your trusted partner in parenting. Sign in to access your dashboard
            and manage your baby&#39;s wellness.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center p-4 sm:p-8 md:p-12 bg-muted">
        <div className="w-full max-w-sm space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-ink">Sign in</h2>
            <p className="text-sm text-ink-muted mt-2">
              Enter your credentials to access your account
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
            <TextInputField
              placeholder="your@email.com"
              label="Email Address"
              error={errors.email?.message}
              {...register("email")}
            />

            <PasswordInputField
              label="Password"
              placeholder="••••••••"
              error={errors.password?.message}
              {...register("password")}
            />

            <div className="flex justify-end">
              <Link
                href="/forgot-password"
                className="text-sm font-medium text-shield"
              >
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-11"
            >
              {isSubmitting ? "Signing In..." : "Sign In"}
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-muted px-3 text-xs text-ink-muted uppercase">
                Or continue with
              </span>
            </div>
          </div>

          <Button
            type="button"
            onClick={() => googleLogin()}
            className="w-full h-11 rounded-lg border border-border bg-card text-ink flex items-center justify-center gap-3 hover:text-gray-600 cursor-pointer"
          >
            <Image
              src={"/google.svg"}
              alt={"Google Icon"}
              width={20}
              height={20}
              className={"w-6 h-6"}
            />
            Continue with Google
          </Button>

          <p className="text-center text-sm text-ink-muted">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="font-semibold text-shield">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
