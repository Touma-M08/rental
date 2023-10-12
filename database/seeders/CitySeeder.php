<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CitySeeder extends Seeder
{
    protected $cities = [
        "板橋区",
        "練馬区",
        "北区",
        "足立区",
        "葛飾区",
        "江戸川区",
        "荒川区",
        "墨田区",
        "台東区",
        "文京区",
        "豊島区",
        "仲野区",
        "杉並区",
        "世田谷区",
        "目黒区",
        "渋谷区",
        "新宿区",
        "千代田区",
        "中央区",
        "江東区",
        "港区",
        "品川区",
        "大田区",

    ];
    public function run(): void
    {
        foreach($this->cities as $city) {
            DB::table('city')->insert([
                'name' => $city,
            ]);
        }
    }
}
