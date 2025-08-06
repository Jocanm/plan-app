"use client";

import { GoogleIcon } from "@/components/icons/GoogleIcon";
import { Button } from "@/components/ui/Button";
import { signIn } from "next-auth/react";
import { useState } from "react";

export const GoogleButton = () => {
  const [loading, setLoading] = useState(false);

  const onClick = async () => {
    setLoading(true);
    await signIn("google", {
      redirectTo: "/",
    });
    setLoading(false);
  };

  return (
    <Button
      onClick={onClick}
      disabled={loading}
      variant="outline"
      className="w-full h-14 text-base font-medium bg-background/80 hover:bg-surface border-surface-border hover:border-primary/30 transition-all duration-200"
    >
      <GoogleIcon />
      Continue with Google
    </Button>
  );
};
