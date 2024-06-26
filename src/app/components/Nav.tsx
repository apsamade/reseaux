import Link from "next/link"
import ButtonGoogle from "@/app/components/ButtonGoogle"

const Nav = () => {
    return (
        <nav className="flex flex-wrap items-end justify-center fixed top-0 left-0 bottom-0 m-3 bg-primary w-[300px] rounded-lg p-3">
            <div className="w-full mt-12 basis-full">
                <Link className="p-3 hover:bg-white hover:text-black duration-200 rounded-lg text-center mb-5 bg-secondary basis-full block w-full" href="/">Community</Link>
                <Link className="py-2 border-b border-transparent duration-200 hover:border-white text-center w-fit mx-auto px-6 block" href="/">My Store</Link>
            </div>
            <ButtonGoogle type="Sign In" />
        </nav>
    )
}

export default Nav