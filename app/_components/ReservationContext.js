"use client";
import { useContext } from "react";
import { Children } from "react";
import { createContext, useState } from "react";
// creating context
const ReservationContext = createContext();
const initialStates = { from: undefined, to: undefined };
function ReservationProvider({ children }) {
  // const resetRange = null;
  const [range, setRange] = useState(initialStates);

  return (
    <ReservationContext.Provider value={{ range, setRange }}>
      {children}
    </ReservationContext.Provider>
  );
}

function useReservation() {
  const context = useContext(ReservationContext);
  if (context === undefined)
    throw new Error("context was used outside provoder");
  return context;
}
export { ReservationProvider, useReservation };
