import React, { Dispatch, SetStateAction, useState } from "react";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { authClient } from "@/lib/auth";

import { useRouter } from "next/navigation";

import { CircleCheckIcon, XIcon } from "lucide-react";

const formSchema = z.object({
  verificationCode: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

type Props = {
  email: string;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

function OTPInputModal({ email, isOpen, setIsOpen }: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      verificationCode: "",
    },
  });
  const router = useRouter();

  const isLoading = form.formState.isSubmitting;
  const [isSending, setIsSending] = useState(false);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { verificationCode } = values;

    const { error } = await authClient.signIn.emailOtp({
      email,
      otp: verificationCode,
    });

    if (error) {
      toast.error(error.message);
      return;
    }

    form.reset();
    setIsOpen(false);
    router.refresh();
  }

  const handleResend = async () => {
    setIsSending(true);
    const { error } = await authClient.emailOtp.sendVerificationOtp({
      email,
      type: "sign-in",
    });

    if (error) {
      toast.error(error.message);
      setIsSending(false);
      return;
    }

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

    setIsSending(false);
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="w-96">
        <DialogHeader>
          <DialogTitle>Sign In</DialogTitle>
          <DialogDescription>
            Enter the 6-digit code send to your email. This code is valid for
            the next 1 minute.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6"
          >
            <FormField
              control={form.control}
              name="verificationCode"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>One-Time Password</FormLabel>
                  <FormControl>
                    <InputOTP maxLength={6} {...field}>
                      <InputOTPGroup className="mx-auto">
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                      </InputOTPGroup>
                      <InputOTPSeparator />

                      <InputOTPGroup className="mx-auto">
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                      </InputOTPGroup>

                      <InputOTPSeparator />

                      <InputOTPGroup className="mx-auto">
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                disabled={isLoading || isSending}
                type="submit"
                className="w-full"
              >
                Submit
              </Button>
            </DialogFooter>
          </form>
        </Form>
        <div className="flex items-center justify-center">
          Didn&apos;t get the code?
          <Button
            disabled={isLoading || isSending}
            className="px-1 font-bold"
            variant={"link"}
            onClick={handleResend}
          >
            Resend Code
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default OTPInputModal;
