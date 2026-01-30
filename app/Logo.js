// importing image component which optimizes the image
import Image from "next/image";
import logo from "@/public/logo.png";
import Link from "next/link";

function Logo() {
  console.log("logo");
  return (
    <Link href="/" className="flex items-center gap-4 z-10">
      <Image
        src={logo}
        height={60}
        width={60}
        quality={100}
        alt="The mountain view"
      />
      Mountain-View
    </Link>
  );
}

export default Logo;
