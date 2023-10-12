import { FC, useState, useEffect } from "react";
import { useForm } from "@inertiajs/react";
import type { House } from "@/Types/House";
import type { City } from "@/Types/City";
import type { Floor } from "@/Types/Floor";
import Nav from "@/Components/Nav";

type Props = {
    cities: City[],
    floors: Floor[]
}

const Create:FC<Props> = ({cities, floors}) => {
    const {data, setData, post, processing, reset, errors} = useForm<House>({
        id: undefined,
        name: "",
        city_id: 0,
        floor_id: 0,
        stations: [["",""]],
        rent: 0,
        url: "",
        mayu_minutes: undefined,
        toma_minutes: undefined,
        rate: 0,
        memo: ""
    });
    const rates = [1,2,3,4,5];

    const handleInputChange = (e:string|number, index:number, num:number) => {
        const array:any = [...data.stations];
        num == 0 ? array[index][0] = e : array[index][1] = e;
        setData("stations", array);
    }

    const handleAddInput = () => {
        const array:any = [...data.stations, ["", ""]];
        setData("stations", array); 
    }

    const handleDeleteInput = (num:number) => {
        const array:any = data.stations.filter((station:[string,number|string], index:number) => index !== num);
        console.log(array);
        setData("stations", array); 
    }

    const handleSendHouse = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route("house.store"));
        reset();
    }

    return (
        <div className="bg-blue-100">
            <form onSubmit={handleSendHouse} className="container max-w-2xl mx-auto  md:w-3/4 p-5 mb-14">
                <div className="p-4 border-t-2 border-indigo-400 rounded-t-lg bg-white">
                    <div className="max-w-sm mx-auto md:w-full md:mx-0">
                        <div className="inline-flex items-center space-x-4">
                            <h1 className="text-gray-600">
                                家登録
                            </h1>
                        </div>
                    </div>
                </div>
                <div className="bg-white">
                    <div className="items-center w-full p-4 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
                        <h2 className="max-w-sm mx-auto md:w-1/3">
                            建物名
                        </h2>
                        <div className="max-w-sm mx-auto md:w-2/3">
                            <div className=" relative ">
                                <input type="text" onChange={(e) => setData("name", e.target.value)} className=" rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="建物名"/>
                                {errors.name && <p className="text-red-400">{errors.name}</p>}
                            </div>
                        </div>
                    </div>
                    <hr/>

                    <div className="items-center w-full p-4 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
                        <h2 className="max-w-sm mx-auto md:w-1/3">
                            区
                        </h2>
                        <div className="max-w-sm mx-auto md:w-2/3">
                            <div className=" relative ">
                                <select onChange={(e) => setData("city_id", Number(e.target.value))} className=" rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent">
                                    <option value="">どこ区</option>
                                    {cities.map((city:City) => (
                                        <option key={city.id} value={city.id}>{city.name}</option>
                                    ))}
                                </select>
                                {errors.city_id && <p className="text-red-400">{errors.city_id}</p>}
                            </div>
                        </div>
                    </div>
                    <hr/>

                    <div className="items-center w-full p-4 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
                        <h2 className="max-w-sm mx-auto md:w-1/3">
                            最寄り駅
                        </h2>
                        <div className="max-w-sm mx-auto md:w-2/3">
                            <div className=" relative ">
                                {data.stations.map((station:[string,number|string], index:number) => (
                                    <div className="flex mb-2" key={index}>
                                        <input type="text" value={station[0]} onChange={(e) => handleInputChange(e.target.value, index, 0)} className="rounded-lg appearance-none border border-gray-300 w-3/5  py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="最寄り駅"/>
                                        <input type="text" value={station[1]} onChange={(e) => handleInputChange(e.target.value, index, 1)} className="rounded-lg appearance-none border border-gray-300 w-1/4  ml-2 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="分"/>
                                        <button type="button" onClick={() => handleDeleteInput(index)} className="rounded-full y-2 w-7 h-7 mt-2 ml-2 bg-red-600 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md text-xl">×</button>
                                    </div>
                                ))}
                            </div>

                            <div className=" relative text-center">
                                <button type="button" onClick={handleAddInput} className=" mt-3 relative py-2 px-4 bg-blue-600 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-1/2 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg">追加</button>
                            </div>
                        </div>
                    </div>
                    <hr/>

                    <div className="items-center w-full p-4 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
                        <h2 className="max-w-sm mx-auto md:w-1/3">
                            間取り
                        </h2>
                        <div className="max-w-sm mx-auto md:w-2/3">
                            <div className=" relative ">
                                <select onChange={(e) => setData("floor_id", Number(e.target.value))} className=" rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent">
                                    <option value="">間取り</option>
                                    {floors.map((floor:Floor) => (
                                        <option key={floor.id} value={floor.id}>{floor.name}</option>
                                    ))}
                                </select>
                                {errors.floor_id && <p className="text-red-400">{errors.floor_id}</p>}
                            </div>
                        </div>
                    </div>
                    <hr/>

                    <div className="items-center w-full p-4 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
                        <h2 className="max-w-sm mx-auto md:w-1/3">
                            家賃
                        </h2>
                        <div className="max-w-sm mx-auto md:w-2/3">
                            <div className=" relative ">
                                <input type="text" onChange={(e) => setData("rent", Number(e.target.value))} className=" rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="万円"/>
                                {errors.rent && <p className="text-red-400">{errors.rent}</p>}
                            </div>
                        </div>
                    </div>
                    <hr/>

                    <div className="items-center w-full p-4 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
                        <h2 className="max-w-sm mx-auto md:w-1/3">
                            URL
                        </h2>
                        <div className="max-w-sm mx-auto md:w-2/3">
                            <div className=" relative ">
                                <input type="text" onChange={(e) => setData("url", e.target.value)} className=" rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="URL"/>
                                {errors.url && <p className="text-red-400">{errors.url}</p>}
                            </div>
                        </div>
                    </div>
                    <hr/>

                    <div className="items-center w-full p-4 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
                        <h2 className="max-w-sm mx-auto md:w-1/3">
                            所要時間
                        </h2>
                        <div className="max-w-sm mx-auto space-y-5 md:w-2/3">
                            <div>
                                <div className=" relative ">
                                    <input type="text" onChange={(e) => setData("mayu_minutes", Number(e.target.value))} className=" rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="まゆ"/>
                                    {errors.mayu_minutes && <p className="text-red-400">{errors.mayu_minutes}</p>}
                                </div>
                            </div>
                            <div>
                                <div className=" relative ">
                                    <input type="text" onChange={(e) => setData("toma_minutes", Number(e.target.value))} className=" rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="とーま"/>
                                    {errors.toma_minutes && <p className="text-red-400">{errors.toma_minutes}</p>}
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr/>

                    <div className="items-center w-full p-4 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
                        <h2 className="max-w-sm mx-auto md:w-1/3">
                            評価
                        </h2>
                        <div className="max-w-sm mx-auto md:w-2/3">
                            <div className=" relative ">
                                { rates.map((rate:number) => (
                                    <label htmlFor={"rate" + rate} className="m-3" >{rate}
                                        <input type="radio" id={"rate" + rate} name="rate" value={rate} onChange={(e) => setData("rate", Number(e.target.value))} className="ml-1"/>
                                    </label>
                                ))}
                                {errors.rate && <p className="text-red-400">{errors.rate}</p>}
                            </div>
                        </div>
                    </div>
                    <hr/>

                    <div className="items-center w-full p-4 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
                        <h2 className="max-w-sm mx-auto md:w-1/3">
                            備考
                        </h2>
                        <div className="max-w-sm mx-auto md:w-2/3">
                            <div className=" relative ">
                                <textarea onChange={(e) => setData("memo", e.target.value)} className="flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="備考" rows={5} cols={40}/>
                            </div>
                        </div>
                    </div>
                    <hr/>
                </div>

                <button type="submit" className="py-2 px-4  bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                    Save
                </button>
            </form>

            <Nav></Nav>
        </div>
    )
}

export default Create;