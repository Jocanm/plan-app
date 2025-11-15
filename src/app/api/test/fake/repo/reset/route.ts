import { FakeProjectsRepositoryManager } from "@/features/projects/data/projects.repository.fake";
import { env } from "@/lib/env";
import { NextResponse } from "next/server";

export async function POST() {
  if (!env.APP_TEST) {
    return NextResponse.json({ error: "Not allowed" }, { status: 403 });
  }

  //Reset all fakeRepositories
  FakeProjectsRepositoryManager.getInstance().reset();

  return NextResponse.json({ ok: true });
}
