"use client";
//useFormStatus is a React hook from react-dom that tracks the status of form submissions. while the form is pending disable the form.

import { useFormStatus } from "react-dom";
// is a reusable submit button for forms with server actions and used for loading indicator while the form is pending
function SubmitButton({ children, pendingLabel }) {
  const { pending } = useFormStatus();
  return (
    <button
      className="bg-accent-500 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
      disabled={pending}
    >
      {pending ? pendingLabel : children}
    </button>
  );
}

export default SubmitButton;
