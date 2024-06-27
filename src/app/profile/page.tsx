'use client'

import { useSession, signOut } from "next-auth/react"
import { redirect } from "next/navigation"

const Profile = () => {
    const { data: session, status } = useSession()

    console.log(status, session)
    return (
        <main className="flex items-start justify-start p-3">
            <div className="w-[320px]"></div>
            <section className="grow relative p-8 min-h-[97vh] pr-16">
                {status === "loading" &&
                    <p>Chargement en cours ...</p>
                }
                {status === "authenticated" &&
                    <div>
                        <h1 className="text-4xl">Ma page Profile</h1>
                        <p className="mt-12">{session?.user?.email}</p>
                        <p>{session?.user?.name}</p>
                    </div>
                }
                <button
                    onClick={() => signOut({ redirect: true, callbackUrl: '/' })}
                    className="text-center absolute bottom-0 left-0 right-0 w-[325px] block mb-auto min-w-[325px] shadow-2xl mx-auto p-4 px-12 hover:px-16 hover:bg-red-700 duration-200 bg-red-500 rounded-lg"
                    type="button"
                >
                    Déconnexion
                </button>
            </section>
        </main>
    )

}

export default Profile