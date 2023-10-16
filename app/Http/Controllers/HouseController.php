<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\City;
use App\Models\House;
use App\Models\Station;
use App\Models\Floor;
use Inertia\Inertia;
use App\Http\Requests\HouseRequest;

class HouseController extends Controller
{
    public function index(Request $request, House $house)
    {
        if($request->sort == "いい度順") {
            $house = $house->with(["city", "stations", "floor"])->orderBy("rate", "desc")->get();
        }elseif($request->sort == "新しい順") {
            $house = $house->with(["city", "stations", "floor"])->orderBy("created_at", "desc")->get();
        }elseif($request->sort == "古い順") {
            $house = $house->with(["city", "stations", "floor"])->orderBy("created_at", "asc")->get();
        }elseif($request->sort == "安い順") {
            $house = $house->with(["city", "stations", "floor"])->orderBy("rent", "asc")->get();//家賃安い
        }elseif($request->sort == "とーま近") {
            $house = $house->with(["city", "stations", "floor"])->where("toma_minutes" ,"!=", null)->orderBy("toma_minutes", "asc")->get();//とーまが近い
        }elseif($request->sort == "まゆ近") {
            $house = $house->with(["city", "stations", "floor"])->where("mayu_minutes" ,"!=", null)->orderBy("mayu_minutes", "asc")->get();//まゆが近い
        }elseif($request->sort == "どっちも30分以内") {
            $house = $house->with(["city", "stations", "floor"])->where("toma_minutes", "<",30)->where("mayu_minutes", "<", 30)->orderBy("toma_minutes", "asc")->get();//どっちも30分以内
        }elseif($request->sort == "どっちも60分以内") {
            $house = $house->with(["city", "stations", "floor"])->where("toma_minutes", "<",60)->where("mayu_minutes", "<", 60)->orderBy("toma_minutes", "asc")->get();//どっちも1時間以内
        }else {
            $house = $house->with(["city", "stations", "floor"])->orderBy("created_at", "desc")->get();
        }

        return Inertia::render("House/Index", ["houses" => $house, "sort" => $request->sort]);
    }

    public function create(City $city, Station $station, Floor $floor)
    {
        return Inertia::render("House/Create", [
            "cities" => $city->get(),
            "stations" => $station->get(),
            "floors" => $floor->get(),
        ]);
    }

    public function store(HouseRequest $request, House $house)
    {
        $input = $request->except("stations");
        $house->fill($input)->save();

        $input = $request->only("stations");
    
        foreach($input["stations"] as $station) {
            $value = [
                "name" => $station[0],
                "minutes" => $station[1],
                "house_id" => $house->id,
            ];
            $add_station = new Station;
            $add_station->fill($value)->save();
        }

        return redirect(route("house.index"));
    }

    public function edit(House $house, CIty $city, Floor $floor) 
    {
        return Inertia::render("House/Edit",[
            "house" => $house->load(["stations"]),
            "cities" => $city->get(),
            "floors" => $floor->get()
        ]);
    }

    public function update(HouseRequest $request, House $house)
    {
        $input = $request->except("stations");
        $house->fill($input)->save();

        foreach($house->stations as $station) {
            $station->delete();
        }

        $input = $request->only("stations");
        foreach($input["stations"] as $station) {
                $value = [
                    "name" => $station[0],
                    "minutes" => $station[1],
                    "house_id" => $house->id,
                ];
            if($value["name"] != null && $value["minutes"] != null) {    
                $add_station = new Station;
                $add_station->fill($value)->save();
            }
        }

        return redirect(route("house.index"));
    }

    public function delete(House $house)
    {
        $house->delete();

        return redirect(route("house.index"));
    }
}
