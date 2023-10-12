<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class House extends Model
{
    use HasFactory;

    protected $fillable = ["name", "city_id", "floor_id", "rent", "url", "mayu_minutes", "toma_minutes", "rate", "memo"];

    public function stations()
    {
        return $this->hasMany(Station::class);
    }

    public function city()
    {
        return $this->belongsTo(City::class);
    }

    public function floor()
    {
        return $this->belongsTo(Floor::class);
    }
}