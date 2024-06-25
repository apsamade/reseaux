import Link from "next/link";

import { getServerAuthSession } from "@/server/auth";

export default async function Home() {
  const session = await getServerAuthSession();

  return (
    <main className="">
      
    </main>
  );
}
