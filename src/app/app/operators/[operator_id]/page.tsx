import { redirect } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ operator_id: string }>;
}) {
  const p = await params;
  const { operator_id } = p;
  console.log(p);
  redirect(`/app/operators/${operator_id}/sessions`);
}
