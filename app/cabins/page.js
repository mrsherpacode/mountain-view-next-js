// In Next.js, (App Router) app is a root folder and folders inside app define route segments and page.js exports the react component for that route.for example,inside app folder,there's cabins folder inside cabins folder there's a page.js file that's basically react component.

import { Suspense } from "react";
import CabinList from "../_components/CabinList";
import Spinner from "../_components/Spinner";
// ISR: After 1 hour, next request triggers background revalidation from Supabase
// User gets cached data immediately; fresh data appears in subsequent requests
//Semi-static with ISR = cached & served fast, revalidates periodically
// This apply for entire page and we can also apply for individual component with(import { unstable_cache } from "next/cache");
export const revalidate = 3600; // 60 * 60

// This Metadata overrides the root Metadata.
export const metadata = {
  title: "Cabins",
};

export default function Page() {
  return (
    <div>
      <h1 className="text-4xl mb-5 text-accent-400 font-medium">
        Our Luxury Cabinss
      </h1>
      <p className="text-primary-200 text-lg mb-10">
        Cozy yet luxurious cabins, located right in the heart of the Italian
        Dolomites. Imagine waking up to beautiful mountain views, spending your
        days exploring the dark forests around, or just relaxing in your private
        hot tub under the stars. Enjoy nature's beauty in your own little home
        away from home. The perfect spot for a peaceful, calm vacation. Welcome
        to paradise.
      </p>
      {/*Here, Suspense a react built in component shows a fallback Spinner while CabinList is fetching data from supabase. only here suspense because the above content doesn't fetch any data*/}

      <Suspense fallback={<Spinner />}>{<CabinList />}</Suspense>
    </div>
  );
}
