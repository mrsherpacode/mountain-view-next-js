"use client";
import { useContext } from "react";
import { createContext, useState } from "react";
//creating context to make states accessible to other pages.
const ReservationContext = createContext();
const initialStates = { from: undefined, to: undefined };
// ReservationProvider is a wrapper component that lets all nested components share the same reservation dates
function ReservationProvider({ children }) {
  // This function set range to initialStates.
  function resetRange() {
    setRange(initialStates);
  }
  const [range, setRange] = useState(initialStates);

  return (
    <ReservationContext.Provider value={{ range, setRange, resetRange }}>
      {children}
    </ReservationContext.Provider>
  );
}
// useReservation is a custom hook that consumes (reads) the context from ReservationContext using useContext
function useReservation() {
  const context = useContext(ReservationContext);
  if (context === undefined)
    throw new Error("context was used outside provoder");
  return context;
}
export { ReservationProvider, useReservation };
