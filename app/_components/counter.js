//"use client" directive at the top, so it will render the component on the client side in Next.js. The default component in next.js is server side component.
"use client";
import { useState } from "react";
// The users prop gets the server side component's data to the client. prop connects the server and client.
export default function Counter({ users }) {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>There are {users.length} users.</p>
      <button onClick={() => setCount((c) => c + 1)}>Count: {count}</button>
    </div>
  );
}
