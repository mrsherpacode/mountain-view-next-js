"use client";
import { useOptimistic } from "react";
import ReservationCard from "./ReservationCard";
import { deleteReservation } from "../_lib/actions";
function ReservationList({ bookings }) {
  //useOptimistic is a React hook for showing the result of an action in the UI before the real async work finishes.
  const [optimisticBookings, optimisticDelete] = useOptimistic(
    bookings,
    (curBookings, bookingId) => {
      return curBookings.filter((booking) => booking.id !== bookingId);
    },
  );
  // function that delete booking on UI and server
  async function handleDelete({ bookingId }) {
    optimisticDelete(bookingId);
    await deleteReservation({ bookingId });
  }

  return (
    <div>
      <ul className="space-y-6">
        {optimisticBookings.map((booking) => (
          <ReservationCard
            onDelete={handleDelete}
            booking={booking}
            key={booking.id}
          />
        ))}
      </ul>
    </div>
  );
}

export default ReservationList;
