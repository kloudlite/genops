import { checkAuth } from "@/server-functions/auth";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const resp = await checkAuth({ doRedirect: false });
  if (resp.error) return <>{children}</>;
  redirect("/app");
}
