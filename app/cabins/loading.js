// This loading only applies to the cabins route
import Spinner from "../_components/Spinner";
export default function loading() {
  return (
    <div className="grid items-center justify-center">
      <Spinner />
      <p className="text-xl text-primary-200">Cabin data is loading</p>
    </div>
  );
}
