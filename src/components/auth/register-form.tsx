"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "../ui/field";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { authClient } from "@/lib/auth-client";

const registerSchema = z
  .object({
    email: z.email(),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match.",
  });

type LoginPayload = z.infer<typeof registerSchema>;

const RegisterForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const form = useForm<LoginPayload>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (payload: LoginPayload) => {
    await authClient.signUp.email({
        name: payload.email,
        email: payload.email,
        password: payload.password,
        callbackURL: '/',
    },
    {
        onSuccess: () => {
            router.push("/");
        },
        onError: (ctx) => {
            toast.error(ctx.error.message);
        }
    }
)
  };

  const isPending = form.formState.isSubmitting;
  const errors = form.formState.errors;
  return (
    <div className="flex flex-col gap-6">
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Get Started</CardTitle>
            <CardDescription>
              Create your account to get started
            </CardDescription>
          </CardHeader>
          <FieldGroup>
            <CardContent className="grid gap-6">
              {/* Email */}
              <Field className={errors.email && "text-destructive"}>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  className={`rounded-md ${errors.email && "border-destructive focus:ring-destructive placeholder:text-destructive"}`}
                  placeholder="email@example.com"
                  type="email"
                  autoComplete="email"
                  {...form.register("email")}
                />
                {errors.email && (
                  <FieldDescription className="text-destructive">
                    {errors.email.message}
                  </FieldDescription>
                )}
              </Field>

              {/* Password */}
              <Field className={errors.password && "text-destructive"}>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <div className="relative">
                  <Input
                    id="password"
                    className={`rounded-md ${errors.password && "border-destructive focus:ring-destructive placeholder:text-destructive"}`}
                    placeholder="••••••••"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    {...form.register("password")}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className={`absolute right-3 top-1/2 -translate-y-1/2 ${errors.password ? "text-destructive hover:text-destructive" : "text-muted-foreground hover:text-foreground"}`}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <FieldDescription className="text-destructive">
                    {errors.password.message}
                  </FieldDescription>
                )}
              </Field>

              {/* Confirm Password */}
              <Field className={errors.confirmPassword && "text-destructive"}>
                <FieldLabel htmlFor="confirmPassword">
                  Confirm Password
                </FieldLabel>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    className={`rounded-md ${errors.confirmPassword && "border-destructive focus:ring-destructive placeholder:text-destructive"}`}
                    placeholder="••••••••"
                    type={showConfirmPassword ? "text" : "password"}
                    autoComplete="current-password"
                    {...form.register("confirmPassword")}
                  />

                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    className={`absolute right-3 top-1/2 -translate-y-1/2 ${errors.confirmPassword ? "text-destructive hover:text-destructive" : "text-muted-foreground hover:text-foreground"}`}
                    aria-label={
                      showConfirmPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <FieldDescription className="text-destructive">
                    {errors.confirmPassword.message}
                  </FieldDescription>
                )}
              </Field>

              <Field>
                <Button
                  type="submit"
                  disabled={isPending}
                  className="rounded-md cursor-pointer"
                >
                  {isPending ? "Loading..." : "Sign Up"}
                </Button>
              </Field>

              <p className="text-center text-sm">
                Already have an account?{" "}
                <Link href="/login" className="underline underline-offset-4">
                  Login
                </Link>
              </p>
            </CardContent>
            <CardFooter>
              <Field className="flex flex-col gap-4">
                <Button
                  variant="outline"
                  className="w-full rounded-md cursor-pointer"
                  type="button"
                  disabled={isPending}
                >
                  <Image
                    src="/logos/google.svg"
                    width={20}
                    height={20}
                    alt="Google Logo"
                  />
                  Continue with Google
                </Button>
                <Button
                  variant="outline"
                  className="w-full rounded-md cursor-pointer "
                  type="button"
                  disabled={isPending}
                >
                  <Image
                    src="/logos/github.svg"
                    width={20}
                    height={20}
                    alt="GitHub Logo"
                  />
                  Continue with GitHub
                </Button>
              </Field>
            </CardFooter>
          </FieldGroup>
        </Card>
      </form>
    </div>
  );
};

export default RegisterForm;
