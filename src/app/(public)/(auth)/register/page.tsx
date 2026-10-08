"use client";

import type React from "react";
import { useCallback, useState } from "react";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import TextInputField from "@/components/field/TextInputField";
import PasswordInputField from "@/components/field/PasswordInput";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { authService } from "@/Service/auth.service";
import { toast } from "sonner";
import { Chrome } from "lucide-react";
import { useGoogleLogin } from "@react-oauth/google";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

const registerSchema = z
  .object({
    firstName: z
      .string()
      .min(2, { message: "First name must be at least 2 characters" }),
    lastName: z
      .string()
      .min(2, { message: "Last name must be at least 2 characters" }),
    email: z.string().email({ message: "Invalid email address" }),
    phone: z
      .string()
      .regex(/^\d{10,15}$/, { message: "Phone number must be 10-15 digits" }),
    address: z
      .string()
      .min(5, { message: "Address must be at least 5 characters" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
    password_confirmation: z
      .string()
      .min(8, { message: "Password confirmation is required" }),
    image: z
      .any()
      .refine((files) => files?.length === 1, {
        message: "Profile image is required",
      })
      .refine((files) => files?.[0]?.size <= 5 * 1024 * 1024, {
        message: "Image must be less than 5MB",
      })
      .refine((files) => files?.[0]?.type.startsWith("image/"), {
        message: "Only image files are allowed",
      }),
  })
  .refine((data) => data.password === data.password_confirmation, {
    path: ["password_confirmation"],
    message: "Passwords do not match",
  });

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      password: "",
      password_confirmation: "",
    },
  });

  const onSubmit = useCallback(async (data: RegisterFormData) => {
    try {
      const formData = new FormData();
      formData.append("name", `${data.firstName} ${data.lastName}`);
      formData.append("email", data.email);
      formData.append("phone", data.phone);
      formData.append("address", data.address);
      formData.append("password", data.password);
      formData.append("password_confirmation", data.password_confirmation);
      if (data.image?.[0]) {
        formData.append("image", data.image[0]);
      }

      const response = await authService.register(formData);
      toast.success(response.message || "Registration successful");
    } catch (error: any) {
      toast.error(error.message || "Registration failed");
    }
  }, []);

  const handleImageChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewImage(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    },
    [],
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
    <div className="h-fit grid lg:grid-cols-2 items-stretch container mx-auto px-4 sm:px-8 my-12">
      <div className="hidden lg:flex flex-col items-center justify-center bg-navy text-on-navy p-6 xl:p-12 relative overflow-hidden rounded-3xl my-6">
        <div className="relative z-10 text-center max-w-md">
          <div className="w-16 h-16 rounded-full bg-sky-soft flex items-center justify-center mb-8 mx-auto">
            <div className="w-6 h-6 rounded-full bg-shield"></div>
          </div>

          <h1 className="text-4xl xl:text-5xl font-extrabold mb-6 text-balance">
            Join BabyCare Today
          </h1>
          <p className="text-lg text-on-navy/80 leading-relaxed">
            Start managing your baby&#39;s health with personalized tips,
            reminders, and expert guidance.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center p-4 sm:p-8 bg-muted overflow-y-auto">
        <div className="w-full max-w-sm space-y-6 py-8">
          <div className="text-center lg:hidden">
            <div className="w-14 h-14 rounded-2xl bg-shield/10 text-shield flex items-center justify-center mx-auto mb-4">
              <div className="w-7 h-7 rounded bg-shield/40"></div>
            </div>
            <h2 className="text-3xl font-bold text-ink">Create Account</h2>
            <p className="text-sm text-ink-muted mt-2">
              Sign up for free to get started
            </p>
          </div>

          <div className="hidden lg:block">
            <h2 className="text-3xl font-bold text-ink">Create Account</h2>
            <p className="text-sm text-ink-muted mt-2">
              Sign up for free to get started
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 gap-3">
              <TextInputField
                placeholder="John"
                label="First Name"
                error={errors.firstName?.message}
                {...register("firstName")}
              />
              <TextInputField
                placeholder="Doe"
                label="Last Name"
                error={errors.lastName?.message}
                {...register("lastName")}
              />
            </div>

            <TextInputField
              placeholder="your@email.com"
              label="Email Address"
              error={errors.email?.message}
              {...register("email")}
            />

            <TextInputField
              placeholder="1234567890"
              label="Phone Number"
              error={errors.phone?.message}
              {...register("phone")}
            />

            <TextInputField
              placeholder="123 Main St, City, State"
              label="Address"
              error={errors.address?.message}
              {...register("address")}
            />

            <PasswordInputField
              placeholder="••••••••"
              label="Password"
              error={errors.password?.message}
              {...register("password")}
            />

            <PasswordInputField
              placeholder="••••••••"
              label="Confirm Password"
              error={errors.password_confirmation?.message}
              {...register("password_confirmation")}
            />

            <div className="space-y-2">
              <Label
                htmlFor="image"
                className="text-sm font-medium text-ink-muted"
              >
                Profile Image
              </Label>
              <Input
                id="image"
                type="file"
                accept="image/*"
                className="cursor-pointer"
                {...register("image")}
                onChange={(e) => {
                  register("image").onChange(e);
                  handleImageChange(e);
                }}
              />
              {errors.image?.message && (
                <p className="text-sm text-danger">
                  {errors.image.message as string}
                </p>
              )}
              {previewImage && (
                <div className="mt-3">
                  <img
                    src={previewImage || "/placeholder.svg"}
                    alt="Profile preview"
                    className="w-20 h-20 rounded-lg object-cover border-2 border-sky"
                  />
                </div>
              )}
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-11 text-base font-semibold rounded-lg bg-shield hover:bg-shield text-white transition-colors mt-6"
            >
              {isSubmitting ? "Creating Account..." : "Create Account"}
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-muted px-3 text-xs font-medium text-ink-muted uppercase tracking-wide">
                Or sign up with
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
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-shield hover:text-shield transition-colors"
            >
              Sign in
            </Link>
          </p>

          <p className="text-center text-xs text-ink-muted leading-relaxed px-2">
            By creating an account, you agree to our{" "}
            <Link
              href="/terms"
              className="underline hover:text-ink-muted transition-colors"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="underline hover:text-ink-muted transition-colors"
            >
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
