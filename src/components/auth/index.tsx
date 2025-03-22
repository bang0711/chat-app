"use client";

import { CircleCheckIcon, GalleryVerticalEnd, XIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import Image from "next/image";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { authClient } from "@/lib/auth";
import { useState } from "react";
import OTPInputModal from "./otp-input-modal";
import { toast } from "sonner";

const formSchema = z.object({
  email: z
    .string()
    .email({
      message: "Please enter a valid email address.",
    })
    .min(1, {
      message: "Please enter an email address.",
    })
    .max(255, {
      message: "Email address must be at most 255 characters.",
    }),
});

function AuthForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const [isCodeSent, setIsCodeSent] = useState(false);
  const [email, setEmail] = useState("");

  const socialLogin = async (provider: "google" | "github") => {
    const data = await authClient.signIn.social({
      provider,
    });

    if (data.error) {
      toast.error(data.error.message);
      return;
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { email } = values;
    setEmail(email);

    const { error } = await authClient.emailOtp.sendVerificationOtp({
      email,
      type: "sign-in",
    });

    if (error) {
      toast.error(error.message);
      return;
    }

    setIsCodeSent(true);

    toast.custom((t) => (
      <div className="bg-background text-foreground w-full rounded-md border px-4 py-3 shadow-lg sm:w-[var(--width)]">
        <div className="flex gap-2">
          <div className="flex grow gap-3">
            <CircleCheckIcon
              className="mt-0.5 shrink-0 text-emerald-500"
              size={16}
              aria-hidden="true"
            />
            <div className="flex grow justify-between gap-12">
              <p className="text-sm">OTP code was sent to your email</p>
            </div>
          </div>
          <Button
            variant="ghost"
            className="group -my-1.5 -me-2 size-8 shrink-0 p-0 hover:bg-transparent"
            onClick={() => toast.dismiss(t)}
            aria-label="Close banner"
          >
            <XIcon
              size={16}
              className="opacity-60 transition-opacity group-hover:opacity-100"
              aria-hidden="true"
            />
          </Button>
        </div>
      </div>
    ));

    form.reset();
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2">
            <div className="flex cursor-pointer flex-col items-center gap-2 font-medium">
              <div className="flex h-8 w-8 items-center justify-center rounded-md">
                <GalleryVerticalEnd className="size-6" />
              </div>
              <span className="sr-only">Acme Inc.</span>
            </div>
            <h1 className="text-xl font-bold">Welcome to Acme Inc.</h1>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="m@example.com" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="w-full" type="submit" disabled={isLoading}>
                {isLoading ? "Submitting..." : "Submit"}
              </Button>
            </form>
          </Form>

          <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
            <span className="bg-background text-muted-foreground relative z-10 px-2">
              Or
            </span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Button
              disabled={isLoading}
              variant="outline"
              className="w-full"
              onClick={() => socialLogin("github")}
            >
              <Image
                src={"/icons/github.svg"}
                alt="GitHub"
                width={12}
                height={12}
                className="dark:brightness-0 dark:invert"
              />
              Continue with GitHub
            </Button>
            <Button
              disabled={isLoading}
              variant="outline"
              className="w-full"
              onClick={() => socialLogin("google")}
            >
              <Image
                src={"/icons/google.svg"}
                alt="Google"
                width={12}
                height={12}
                className="dark:brightness-0 dark:invert"
              />
              Continue with Google
            </Button>
          </div>
        </div>
      </div>

      <div className="text-muted-foreground hover:[&_a]:text-primary text-center text-xs text-balance [&_a]:underline [&_a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>

      <OTPInputModal
        email={email}
        isOpen={isCodeSent}
        setIsOpen={setIsCodeSent}
      />
    </div>
  );
}

export default AuthForm;
