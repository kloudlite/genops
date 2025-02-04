import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { checkAuth } from "@/server-functions/auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { SignoutButton } from "./client-components";


export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const resp = await checkAuth();
  const user = resp.data;
  if (!resp.error)
    return (
      <>
        <header className="border-b">
          <nav className="flex gap-2 max-w-screen-2xl mx-auto border-x p-4 items-center justify-between">
            <div className="flex items-center gap-2">
              <Link href="/app/operators" className="text-xl font-bold">
                GenOps
              </Link>
              <div className="flex">
                <Button variant="link">
                  <Link href="/app/operators">Your Operators</Link>
                </Button>
                <Button variant="link">
                  <Link href="/app/agent-store">Agent Store</Link>
                </Button>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="link">{user?.username}</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" side="bottom" align="start">
                <DropdownMenuLabel>{user?.name}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <SignoutButton />
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        </header>
        <div className="max-w-screen-2xl mx-auto border-x">{children}</div>
      </>
    );
  redirect("/auth/signin");
}
