<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Rules\not0;

class HouseRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "name" => ["required"],
            "city_id" => ["required", new not0],
            "floor_id" => ["required", new not0],
            "rent" => ["required", "numeric", new not0],
            "mayu_minutes" => ["numeric"],
            "toma_minutes" => ["numeric"],
            "url" => ["required"],
            "rate" => ["required", new not0],
        ];
    }
}
