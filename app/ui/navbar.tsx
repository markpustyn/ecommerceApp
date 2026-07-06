import Link from "next/link";
import { ShoppingCart } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="border-b bg-white">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="text-xl font-bold">
          Ecommer Shop
        </Link>

        <div className="flex items-center gap-5">
          <Link href="/cart">
            <ShoppingCart className="h-6 w-6" />
          </Link>

          <Link
            href="/signin"
            className="rounded-md border px-4 py-2 text-sm hover:bg-gray-100"
          >
            Sign In
          </Link>
        </div>
      </div>
    </nav>
  );
}