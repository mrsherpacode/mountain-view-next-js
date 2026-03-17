"use server";
// this file defines one server-side entry point that starts Google login and then sends the user to the account page.
import { signIn, signOut } from "./auth";
// for siginin in
export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}
// for sign out
export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
