"use client";

import { Button } from "@/components/ui/Button";
import { ROUTES } from "@/constants/routes";
import { Github } from "lucide-react";
import { signIn } from "next-auth/react";
import { useState } from "react";

export const GithubButton = () => {
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    setIsLoading(true);
    await signIn("github", {
      redirectTo: ROUTES.HOME,
    });
    setIsLoading(false);
  };

  return (
    <Button
      variant="outline"
      onClick={onClick}
      disabled={isLoading}
      className="w-full h-14 text-base font-medium bg-background/80 hover:bg-surface border-surface-border hover:border-primary/30 transition-all duration-200"
    >
      <Github className="w-6 h-6" />
      Continue with GitHub
    </Button>
  );
};
