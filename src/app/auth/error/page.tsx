import { NextPagePromiseProps } from "@/types";
import { AlertTriangleIcon } from "lucide-react";
import Link from "next/link";
import { getLoginError } from "../helpers/getLoginError";
import { ROUTES } from "@/constants/routes";

export default async function AuthErrorPage({
  searchParams,
}: NextPagePromiseProps) {
  const error = (await searchParams)?.error;
  const { title, message } = getLoginError(error as string);

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-8 text-center shadow-lg">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
          <AlertTriangleIcon className="h-8 w-8 text-red-600" />
        </div>

        <h1 className="mt-6 text-2xl font-bold text-slate-800">{title}</h1>

        <p className="mt-4 text-slate-600">{message}</p>

        <div className="mt-8">
          <Link
            replace
            href={ROUTES.LOGIN}
            className="inline-block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white shadow-md transition-colors hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Go to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
