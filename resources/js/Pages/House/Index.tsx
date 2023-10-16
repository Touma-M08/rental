import { FC, useState } from "react";
import { useForm, Link, router } from "@inertiajs/react";
import type { House } from "@/Types/House";
import type { City } from "@/Types/City";
import type { Floor } from "@/Types/Floor";
import type { Station } from "@/Types/Station";
import Nav from "@/Components/Nav";
import SortBar from "@/Components/SortBar";

type ShowHouse = House & {
    city: City,
    stations: Station[],
    floor: Floor,
}
type Props = {
    houses: ShowHouse[],
    sort: string
}

const Index:FC<Props> = ({houses, sort}) => {
    const [flag, setFlag] = useState(false);

    const inputFlag = (flag:boolean) => {
        setFlag(flag);
    }
    return (
        <div className="bg-blue-100 h-full min-h-screen">
            <SortBar state={flag} inputFlag={(e:boolean) => inputFlag(e)}></SortBar>
            <p className="font-bold p-6 pb-2 text-xl">{sort ? sort : "新しい順"}</p>
            <div className="pb-16">
                {houses.map((house:ShowHouse) => (
                    <div key={house.id} className="rounded-xl relative m-3 max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <Link href={route("house.edit", house.id)}>
                            <svg className="absolute right-5 stroke-0" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152V424c0 48.6 39.4 88 88 88H360c48.6 0 88-39.4 88-88V312c0-13.3-10.7-24-24-24s-24 10.7-24 24V424c0 22.1-17.9 40-40 40H88c-22.1 0-40-17.9-40-40V152c0-22.1 17.9-40 40-40H200c13.3 0 24-10.7 24-24s-10.7-24-24-24H88z"/></svg>
                        </Link>
                        <button type="button" onClick={() => {router.delete(route("house.delete", house.id),{onBefore: () => confirm("削除しますか？")})}} className="absolute right-14">
                            <svg className="stroke-0" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>
                        </button>
                        <a href="#">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{house.name}</h5>
                        </a>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">いい度：{house.rate}</p>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{house.city.name}　{house.floor.name}　{house.rent}万円</p>
                        {house.stations.map((station:Station) => (
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{station.name}:{station.minutes}分</p>
                        ))}
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">通勤時間 {house.mayu_minutes && ("まゆ：" + house.mayu_minutes + "分")}　{house.toma_minutes && ("とーま：" + house.toma_minutes + "分")}</p>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{house.memo && house.memo}</p>
                        
                        <a href={house.url} className="font-bold inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            サイトに飛ぶ
                            <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                            </svg>
                        </a>
                    </div>
                ))}
            </div>
            <button onClick={() => setFlag(true)} className="text-white text-lg font-bold fixed right-6 bottom-20 bg-blue-500 w-20 h-20 rounded-full">ソート</button>
            <Nav></Nav>
        </div>
    )
}

export default Index;