"use client"

import { useSession } from "next-auth/react";
import Link from "next/link";

export default function Home() {
  const {data: session, status} =  useSession()
  console.log(session, status)
  
  return (
    <main className="flex items-start justify-start p-3">
      <div className="w-[320px] hidden lg:block"></div>
      <section className="grow flex items-start justify-center flex-wrap p-1 lg:p-8 lg:pr-16">
        <div className="mt-24 w-full flex items-center flex-wrap lg:flex-nowrap justify-between">
          <div className="mb-12">
            <h1 className="text-4xl font-semibold mb-2">Gallery</h1>
            <span className="text-[#ffffff79]">Community Gallery</span>
          </div>
          <button className="bg-secondary w-full lg:w-fit lg:mx-0 mx-auto rounded-lg hover:px-6 duration-200 p-3">Add Picture</button>
        </div>
        <p className="text-center mt-24">Aucune image dans la gallery pour le moment ...</p>
      </section>
    </main>
  );
}
