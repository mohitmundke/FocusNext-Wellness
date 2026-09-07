"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { useWellness } from "@/lib/wellness-context";
import { Eye, EyeOff, Lock, Mail, User, Sparkles } from "lucide-react";
import { toast } from "sonner";

const authSchema = z.object({
  name: z.string().optional(),
  email: z.string().email("Please enter a valid work email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type AuthFormData = z.infer<typeof authSchema>;

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function AuthModal({ isOpen, onClose, onSuccess }: AuthModalProps) {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useWellness();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AuthFormData>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  const onSubmit = async (data: AuthFormData) => {
    setIsLoading(true);
    try {
      // Simulate network request
      await new Promise((resolve) => setTimeout(resolve, 600));
      login(data.email, data.name || data.email.split("@")[0]);
      toast.success(mode === "signin" ? "Welcome back to FocusNext" : "Account created successfully!");
      reset();
      onClose();
      onSuccess?.();
    } catch {
      toast.error("Failed to authenticate. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = () => {
    login("alex.morgan@workspace.co", "Alex Morgan");
    toast.success("Signed in as Demo User (Alex Morgan)");
    onClose();
    onSuccess?.();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={mode === "signin" ? "Sign in to FocusNext" : "Create your account"}
      description={
        mode === "signin"
          ? "Access your personalized wellness rhythm and session history."
          : "Start building healthier, more sustainable daily work routines."
      }
    >
      {/* Mode Switch Tabs */}
      <div className="flex border-b border-border mb-6">
        <button
          type="button"
          onClick={() => {
            setMode("signin");
            reset();
          }}
          className={`flex-1 py-2.5 text-xs font-semibold uppercase tracking-wider transition-colors border-b-2 -mb-px ${
            mode === "signin"
              ? "border-foreground text-foreground"
              : "border-transparent text-foreground-secondary hover:text-foreground"
          }`}
        >
          Sign In
        </button>
        <button
          type="button"
          onClick={() => {
            setMode("signup");
            reset();
          }}
          className={`flex-1 py-2.5 text-xs font-semibold uppercase tracking-wider transition-colors border-b-2 -mb-px ${
            mode === "signup"
              ? "border-foreground text-foreground"
              : "border-transparent text-foreground-secondary hover:text-foreground"
          }`}
        >
          Create Account
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {mode === "signup" && (
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground">Full Name</label>
            <div className="relative">
              <User className="w-4 h-4 text-foreground-muted absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                {...register("name")}
                type="text"
                placeholder="Alex Morgan"
                className="w-full pl-9 pr-3 py-2 text-sm bg-background-subtle border border-border rounded-xl text-foreground placeholder:text-foreground-muted focus:bg-surface focus:border-wellness focus:outline-none transition-colors"
              />
            </div>
          </div>
        )}

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-foreground">Work Email</label>
          <div className="relative">
            <Mail className="w-4 h-4 text-foreground-muted absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              {...register("email")}
              type="email"
              placeholder="alex@company.com"
              className="w-full pl-9 pr-3 py-2 text-sm bg-background-subtle border border-border rounded-xl text-foreground placeholder:text-foreground-muted focus:bg-surface focus:border-wellness focus:outline-none transition-colors"
            />
          </div>
          {errors.email && (
            <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-foreground">Password</label>
            {mode === "signin" && (
              <span className="text-[11px] text-foreground-secondary hover:underline cursor-pointer">
                Forgot password?
              </span>
            )}
          </div>
          <div className="relative">
            <Lock className="w-4 h-4 text-foreground-muted absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              {...register("password")}
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className="w-full pl-9 pr-10 py-2 text-sm bg-background-subtle border border-border rounded-xl text-foreground placeholder:text-foreground-muted focus:bg-surface focus:border-wellness focus:outline-none transition-colors"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground-muted hover:text-foreground"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {errors.password && (
            <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>
          )}
        </div>

        <Button
          type="submit"
          variant="primary"
          isLoading={isLoading}
          className="w-full justify-center mt-2"
        >
          {mode === "signin" ? "Sign In" : "Get Started"}
        </Button>

        {/* 1-Click Demo User Button */}
        <div className="pt-3 border-t border-border">
          <Button
            type="button"
            variant="secondary"
            onClick={handleDemoLogin}
            className="w-full justify-center text-xs gap-2"
          >
            <Sparkles className="w-3.5 h-3.5 text-wellness" />
            <span>Instant Demo Sign-in (Alex Morgan)</span>
          </Button>
        </div>
      </form>
    </Modal>
  );
}
