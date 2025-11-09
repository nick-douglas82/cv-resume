import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { api } from "@/lib/apiClient";

export async function GET() {
  const session = await getServerSession();
  console.log("session", session);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const upstream = await api.get("/resumes");
  return NextResponse.json(upstream.data, { status: upstream.status });
}
