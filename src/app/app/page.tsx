import { checkAuth } from "@/server-functions/auth";

export default async function Page(){
  await checkAuth()
  return <></>
}