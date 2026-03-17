import { signInAction } from "../_lib/actions";
export const metadata = {
  title: "singin",
};
//Because this component is a Server Component by default, and server components cannot attach browser event handlers like onClick. so signInAction is imported from actions.js file
function SignInButton() {
  return (
    <form action={signInAction}>
      <button className="flex items-center gap-6 text-lg border border-primary-300 px-10 py-4 font-medium ">
        <img
          src="https://authjs.dev/img/providers/google.svg"
          alt="Google logo"
          height="24"
          width="24"
        />
        <span>Continue with Google</span>
      </button>
    </form>
  );
}

export default SignInButton;
