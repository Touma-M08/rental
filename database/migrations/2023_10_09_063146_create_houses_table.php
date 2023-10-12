<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('houses', function (Blueprint $table) {
            $table->id();
            $table->string("name");
            $table->foreignId("city_id")->constraint("city");
            $table->foreignId("floor_id")->constraint("floors");
            $table->integer("rent");
            $table->string("url");
            $table->integer("mayu_minutes")->nullable();
            $table->integer("toma_minutes")->nullable();
            $table->integer("rate");
            $table->string("memo")->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('houses');
    }
};
