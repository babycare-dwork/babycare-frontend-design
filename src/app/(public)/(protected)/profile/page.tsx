"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Loader2,
  Mail,
  MapPin,
  Pencil,
  Phone,
  Shield,
  User,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Image from "next/image";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import TextInputField from "@/components/field/TextInputField";
import { useProfile, useProfileUpdate } from "@/hooks/use-profile";

const schema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters"),
});
type FormValues = z.infer<typeof schema>;

function InfoCard({
  icon: Icon,
  label,
  value,
  bg,
  color,
  breakAll,
}: {
  icon: LucideIcon;
  label: string;
  value?: string | number | null;
  bg: string;
  color: string;
  breakAll?: boolean;
}) {
  return (
    <div className="bg-muted rounded-xl p-4 sm:p-6 hover:shadow-md transition-shadow duration-300">
      <div className="flex items-start gap-4">
        <div
          className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full ${bg} flex items-center justify-center shrink-0`}
        >
          <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${color}`} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs sm:text-sm font-medium text-ink-muted mb-1">
            {label}
          </p>
          <p
            className={`text-sm sm:text-base font-semibold text-ink ${breakAll ? "break-all" : ""}`}
          >
            {value || "—"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  const { user: authUser } = useAuth();
  const { data: profileRes } = useProfile();
  const { mutate: updateProfile, isPending } = useProfileUpdate();

  const [isEditing, setIsEditing] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const profile = profileRes?.data;

  const name: string = profile?.name ?? authUser?.name ?? "";
  const email: string = profile?.email ?? authUser?.email ?? "";
  const phone: string | undefined = profile?.mobile_number ?? authUser?.phone;
  const image: string | undefined = profile?.image ?? authUser?.media;
  const address = authUser?.address;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "" },
  });

  useEffect(() => {
    if (isEditing) {
      reset({ name });
      setImageFile(null);
      setPreview(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditing]);

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setImageFile(file);
    setPreview(file ? URL.createObjectURL(file) : null);
  };

  const onSubmit = (values: FormValues) => {
    const formData = new FormData();
    formData.append("name", values.name);
    if (imageFile) formData.append("image", imageFile);
    formData.append("_method", "PUT");

    updateProfile(formData, { onSuccess: () => setIsEditing(false) });
  };

  if (!authUser && !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface-sunken p-4">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-shield border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-ink-muted">Loading profile...</p>
        </div>
      </div>
    );
  }

  const shownImage = preview ?? image;

  return (
    <div className="min-h-screen bg-surface-sunken py-6 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="bg-card rounded-2xl shadow-xl overflow-hidden">
          <div className="relative h-32 sm:h-48 bg-shield">
            <div className="absolute inset-0 bg-black opacity-10"></div>
          </div>

          <div className="relative px-4 sm:px-8 pb-8">
            <div className="flex flex-col sm:flex-row items-center sm:items-end -mt-16 sm:-mt-20 mb-6">
              <div className="relative">
                <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 border-white shadow-xl overflow-hidden bg-shield">
                  {shownImage ? (
                    <Image
                      src={shownImage}
                      alt={name}
                      fill
                      unoptimized={!!preview}
                      sizes="(max-width: 640px) 128px, 160px"
                      className="object-contain"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white text-4xl sm:text-5xl font-bold">
                      {name.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
                <div className="absolute bottom-2 right-2 w-6 h-6 bg-leaf rounded-full border-4 border-white"></div>
              </div>

              <div className="mt-4 sm:mt-0 sm:ml-6 text-center sm:text-left flex-1">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-ink">
                  {name}
                </h1>
                {authUser?.uuid && (
                  <div className="flex items-center justify-center sm:justify-start gap-2 mt-2">
                    <Shield className="w-4 h-4 text-shield" />
                    <p className="text-sm text-ink-muted">
                      ID: {authUser.uuid}
                    </p>
                  </div>
                )}
              </div>

              {!isEditing && (
                <Button
                  className="mt-4 sm:mt-0"
                  onClick={() => setIsEditing(true)}
                >
                  <Pencil className="h-4 w-4" /> Edit Profile
                </Button>
              )}
            </div>

            {isEditing ? (
              <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                className="mt-8 max-w-md space-y-4"
              >
                <h2 className="text-xl font-semibold text-ink">Edit Profile</h2>

                <TextInputField
                  label="Name"
                  error={errors.name?.message}
                  {...register("name")}
                />

                <div className="space-y-2">
                  <Label
                    htmlFor="image"
                    className="text-sm font-medium text-ink-muted"
                  >
                    Profile Image (optional)
                  </Label>
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    className="cursor-pointer"
                    onChange={onFileChange}
                  />
                </div>

                <div className="flex gap-3">
                  <Button type="submit" disabled={isPending}>
                    {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
                    {isPending ? "Saving..." : "Save Changes"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    disabled={isPending}
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-ink mb-4">
                    Contact Information
                  </h2>
                  <InfoCard
                    icon={Mail}
                    label="Email Address"
                    value={email}
                    bg="bg-sky-soft"
                    color="text-shield"
                    breakAll
                  />
                  <InfoCard
                    icon={Phone}
                    label="Phone Number"
                    value={phone}
                    bg="bg-sprout-soft"
                    color="text-leaf"
                  />
                </div>

                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-ink mb-4">
                    Additional Details
                  </h2>
                  <InfoCard
                    icon={MapPin}
                    label="Address"
                    value={address}
                    bg="bg-blush-soft"
                    color="text-coral-strong"
                  />
                  <InfoCard
                    icon={User}
                    label="User ID"
                    value={authUser?.id ? `#${authUser.id}` : undefined}
                    bg="bg-honey-soft"
                    color="text-honey-ink"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
