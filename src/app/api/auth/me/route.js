
import { NextResponse } from "next/server";
import { getCurrentAppUser } from "@/lib/auth";

export async function GET() {
  const user = await getCurrentAppUser();

  if (!user) {
    return NextResponse.json(
      {
        success: false,
        message: "Unauthenticated",
      },
      { status: 401 }
    );
  }

  return NextResponse.json({
    success: true,
    user,
  });
}
