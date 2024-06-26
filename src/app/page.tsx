import Link from "next/link";

import { getServerAuthSession } from "@/server/auth";

export default async function Home() {
  const session = await getServerAuthSession();

  return (
    <main className="flex items-start justify-start p-3">
      <div className="w-[320px]"></div>
      <section className="grow p-8 pr-16">
        <div className="mt-24 w-full flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-semibold mb-2">Gallery</h1>
            <span className="text-[#ffffff79]">Community Gallery</span>
          </div>
          <button className="bg-secondary rounded-lg hover:px-6 duration-200 p-3">Add Picture</button>
        </div>
        <p className="text-center mt-24">Aucune image dans la gallery pour le moment ...</p>
      </section>
    </main>
  );
}
