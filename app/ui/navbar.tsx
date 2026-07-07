import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { auth, signOut } from "@/auth";
import { Avatar, AvatarFallback} from "@/components/ui/avatar"


export default async function Navbar() {
  const session = await auth();

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

          {!session ? (
            <Link
              href="/sign-in"
              className="rounded-md border px-4 py-2 text-sm hover:bg-gray-100 bg-blue-500"
            >
              Sign In
            </Link>
          ) : (
            <div className="flex items-center gap-5">
             <form
             className="rounded-md border px-4 py-2 text-sm hover:bg-gray-100 bg-blue-500"
                action={async () => {
                  "use server"
                  await signOut()
                }}
              >
              <button type="submit">Sign Out</button>
            </form>
            <Avatar>
              <AvatarFallback>{session?.user?.name?.split(" ").map((n) => n[0]).join("")}</AvatarFallback>
            </Avatar>
        </div>
          )}
        </div>
      </div>
    </nav>
  );
}