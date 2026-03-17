"use server";
// this file defines one server-side entry point that starts Google login and then sends the user to the account page.
import { signIn } from "./auth";

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}
