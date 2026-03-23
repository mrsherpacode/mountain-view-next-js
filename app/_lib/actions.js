"use server";

import { revalidatePath } from "next/cache";
// A Server Action bridges client and server by letting a client-side interaction like form submit call server-side  code directly, without you manually building a separate API endpoint.
// this file defines one server-side entry point that starts Google login and then sends the user to the account page.
import { signIn, signOut } from "./auth";
import { auth } from "./auth";
import { supabase } from "./supabase";
// for siginin in
export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}
// updateGuest takes submitted form data and updates the logged-in guest profile in Supabase.

export async function updateGuest(formData) {
  const session = await auth();
  if (!session) throw new Error("you must be logged in before updating");
  const nationalID = formData.get("nationalID");
  const nationalityRaw = formData.get("nationality");
  if (!nationalityRaw) throw new Error("Nationality is required");

  const [nationality, countryFlag] = nationalityRaw.split("%");
  // This regex enforces 6-12 alphanumeric characters to check if the nationalID is valid or not
  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID))
    throw new Error("Please provide a valid national ID");
  // /sends the new values (nationality, countryFlag, nationalID) to supabase
  const updateData = { nationality, countryFlag, nationalID };

  // This is a Supabase query that updates one specific row in supabase database.
  const { data, error } = await supabase
    .from("guests")
    .update(updateData)
    .eq("id", session.user.guestId);

  if (error) {
    throw new Error("Guest could not be updated");
  }
  //This clear cached data for account/profile page and fetch the updated or fresh data on demand
  revalidatePath("/account/profile");
}
// for sign out
export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
