import { NextPagePromiseProps } from "@/types";
import { redirect } from "next/navigation";
import { LoginForm } from "./components/LoginForm";
import { ROUTES } from "@/constants/routes";

export const metadata = {
  title: "Login - Plan app",
  description:
    "Sign in to your Plan app account to manage your tasks and projects.",
};

const Login = async ({ searchParams }: NextPagePromiseProps) => {
  const error = (await searchParams)?.error;

  if (error) {
    const url = new URL(ROUTES.ERROR, window.location.origin);
    url.searchParams.set("error", String(error));
    redirect(url.toString());
  }

  return (
    <div className="min-h-screen">
      <div className="flex flex-col md:flex-row min-h-screen justify-center">
        <div className="md:flex-1 flex items-center justify-center px-12 py-8 md:py-16">
          <div className="max-w-lg">
            <div className="mb-8">
              <h1 className="text-5xl font-light text-foreground mb-6">
                Welcome to{" "}
                <span className="font-semibold text-primary">Plan app</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed hidden md:block">
                Organize your life, manage your tasks, and achieve your goals
                with our beautiful and intuitive task management platform.
              </p>
            </div>
            <div className="space-y-6 hidden md:block">
              <div className="flex items-center gap-4">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <span className="text-muted-foreground">
                  Beautiful task organization
                </span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-muted-foreground">
                  Intuitive calendar integration
                </span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-2 h-2 bg-warning rounded-full"></div>
                <span className="text-muted-foreground">
                  Seamless collaboration
                </span>
              </div>
            </div>
          </div>
        </div>

        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
