import { Link, usePage } from "@inertiajs/react"

const Nav = () => {
    const { url } = usePage();

    return (
        <ul className="bg-white w-full fixed bottom-0 flex justify-around font-medium text-center text-gray-500 border-gray-200 ">
            <li className="w-1/2">
                <Link href={route("house.index")} className={"w-full inline-block p-4 rounded-t-xl " + (url !== "/houses/create" ? "font-bold bg-blue-500 text-white" : "")}>
                    一覧
                </Link>
            </li>
            <li className="w-1/2">
                <Link href={route("house.create")} className={"w-full inline-block p-4 rounded-t-xl "+ (url === "/houses/create" ? "font-bold bg-blue-500 text-white" : "")}>
                    投稿
                </Link>
            </li>
        </ul>
    )
}

export default Nav;