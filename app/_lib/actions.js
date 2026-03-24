"use server";

import { revalidatePath } from "next/cache";
// A Server Action bridges client and server by letting a client-side interaction like form submit call server-side  code directly, without you manually building a separate API endpoint.
// this file defines one server-side entry point that starts Google login and then sends the user to the account page.
import { signIn, signOut } from "./auth";
import { auth } from "./auth";
import { supabase } from "./supabase";
import { getBookings } from "./data-service";
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
// For deleting the reservation
export async function deleteReservation({ bookingId }) {
  //Authenticate user
  const session = await auth();
  if (!session) throw new Error("you must be logged in before updating");
  //Authorize ownership, checks whether the incoming bookingId belongs to that user.
  const bookings = await getBookings(session.user.guestId);
  const bookingIds = bookings.map((booking) => booking.id);
  // throws error if bookingids do not include bookingId.
  if (!bookingIds.includes(bookingId))
    throw new Error("You are not allowed to delete this reservation");
  // Delete in Supabase If authorized,
  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);
  if (error) {
    throw new Error("Booking could not be deleted");
  }
  //revalidatePath("/account/reservations") so the reservations page updates and removes the delated page instantly after deletion.
  revalidatePath("/account/reservations");
}
// for sign out
export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
