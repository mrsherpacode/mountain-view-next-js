import Image from "next/image";

function Logo() {
  return (
    <a href="/" className="flex items-center gap-4 z-10">
      <Image src="/logo.png" height={60} width={60} alt="The mountain view" />
    </a>
  );
}

export default Logo;
