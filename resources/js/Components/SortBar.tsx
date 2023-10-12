import { useForm } from "@inertiajs/react";

const SortBar = ({state, inputFlag}:any) => {
    const {data, setData, get, processing, reset} = useForm({
        sort: ""
    })
    const handleSendSort = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        get(route("house.index"));
        reset();
    }
    return (
        <>
        <form onSubmit={handleSendSort} className={"relative bg-white dark:bg-gray-800 " + (state == true ? "block" : "hidden")}>
            <div className="z-50 fixed top-0 flex bg-white w-full flex-col sm:flex-row sm:justify-around">
                <div className="h-screen w-full">
                    <nav className="px-6">
                        <button type="submit" onClick={() => setData("sort", "いい度順")} className="ml-auto hover:text-gray-800 bg-gray-100 flex items-center p-2 my-6 transition-colors dark:hover:text-white dark:hover:bg-gray-600 duration-200  text-gray-600 dark:text-gray-400 rounded-lg">
                            <span className="mx-4 text-lg font-bold">
                                いい度順
                            </span>
                            <span className="flex-grow text-right">
                            </span>
                        </button>
                        <button type="submit" onClick={() => setData("sort", "安い順")} className="ml-auto hover:text-gray-800 bg-gray-100 flex items-center p-2 my-6 transition-colors dark:hover:text-white dark:hover:bg-gray-600 duration-200  text-gray-600 dark:text-gray-400 rounded-lg">
                            <span className="mx-4 text-lg font-bold">
                                安い順
                            </span>
                            <span className="flex-grow text-right">
                            </span>
                        </button>
                        <button type="submit" onClick={() => setData("sort", "とーま近")} className="ml-auto hover:text-gray-800 bg-gray-100 flex items-center p-2 my-6 transition-colors dark:hover:text-white dark:hover:bg-gray-600 duration-200  text-gray-600 dark:text-gray-400 rounded-lg">
                            <span className="mx-4 text-lg font-bold">
                                とーま近
                            </span>
                            <span className="flex-grow text-right">
                            </span>
                        </button>
                        <button type="submit" onClick={() => setData("sort", "まゆ近")} className="ml-auto hover:text-gray-800 bg-gray-100 flex items-center p-2 my-6 transition-colors dark:hover:text-white dark:hover:bg-gray-600 duration-200  text-gray-600 dark:text-gray-400 rounded-lg">
                            <span className="mx-4 text-lg font-bold">
                                まゆ近
                            </span>
                            <span className="flex-grow text-right">
                            </span>
                        </button>
                        <button type="submit" onClick={() => setData("sort", "どっちも30分以内")} className="ml-auto hover:text-gray-800 bg-gray-100 flex items-center p-2 my-6 transition-colors dark:hover:text-white dark:hover:bg-gray-600 duration-200  text-gray-600 dark:text-gray-400 rounded-lg">
                            <span className="mx-4 text-lg font-bold">
                                どっちも30分以内
                            </span>
                            <span className="flex-grow text-right">
                            </span>
                        </button>
                        <button type="submit" onClick={() => setData("sort", "どっちも60分以内")} className="ml-auto hover:text-gray-800 bg-gray-100 flex items-center p-2 my-6 transition-colors dark:hover:text-white dark:hover:bg-gray-600 duration-200  text-gray-600 dark:text-gray-400 rounded-lg">
                            <span className="mx-4 text-lg font-bold">
                                どっちも60分以内
                            </span>
                            <span className="flex-grow text-right">
                            </span>
                        </button>
                        <button type="submit" onClick={() => setData("sort", "新しい順")} className="ml-auto hover:text-gray-800 bg-gray-100 flex items-center p-2 my-6 transition-colors dark:hover:text-white dark:hover:bg-gray-600 duration-200  text-gray-600 dark:text-gray-400 rounded-lg">
                            <span className="mx-4 text-lg font-bold">
                                新しい順
                            </span>
                            <span className="flex-grow text-right">
                            </span>
                        </button>
                        <button type="submit" onClick={() => setData("sort", "古い順")} className="ml-auto hover:text-gray-800 bg-gray-100 flex items-center p-2 my-6 transition-colors dark:hover:text-white dark:hover:bg-gray-600 duration-200  text-gray-600 dark:text-gray-400 rounded-lg">
                            <span className="mx-4 text-lg font-bold">
                                古い順
                            </span>
                            <span className="flex-grow text-right">
                            </span>
                        </button>
                    </nav>
                    <div className="text-center mt-10">
                        <button onClick={(e) => inputFlag(false)} className="mr-0 bg-gray-100 p-3 rounded-lg my-6">閉じる</button>
                    </div>
                </div>
            </div>
        </form>
    </>
    )
}

export default SortBar;