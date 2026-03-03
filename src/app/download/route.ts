import { NextResponse } from "next/server";

export function GET(request: Request) {
  return NextResponse.redirect(new URL("/download/Vorn-Voice.dmg", request.url), 302);
}
