<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class FloorSeeder extends Seeder
{
    protected $floors = [
        "1DK",
        "1LDK",
        "2K",
        "2DK",
        "2LDK",
        "3K",
        "3DK",
        "3LDK",
    ];

    public function run(): void
    {
        foreach($this->floors as $floor) {
            DB::table('floors')->insert([
                'name' => $floor,
            ]);
        }
    }
}
