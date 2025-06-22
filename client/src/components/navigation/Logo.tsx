import Link from "next/link";
import Image from "next/image";

export default function Logo({ size = 35 }: { size?: number }) {
  return (
    <Link href="/" className="font-bold text-xl flex items-center gap-2">
      <Image
        src="/assets/logo1.png"
        alt="NutriMind Logo"
        width={size}
        height={size}
        style={{ width: size, height: size }}
      />
      <p style={{ fontSize: size > 40 ? 28 : 20 }}>NutriMind</p>
    </Link>
  );
} 