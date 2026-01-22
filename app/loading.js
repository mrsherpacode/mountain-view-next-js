// This is a global loading indicator,and it applies to every pages.

import Spinner from "./_components/Spinner";

// When you place this file in a route folder (like app), Next.js will automatically show this component while the page data is being fetched or the page is being rendered.
export default function loading() {
  return <Spinner />;
}
