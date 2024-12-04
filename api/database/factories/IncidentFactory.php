<?php

namespace Database\Factories;

use App\Models\Client;
use App\Models\Colis;
use App\Models\Enums\IncidentStatusEnum;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class IncidentFactory extends Factory
{
    /**
     * The name of the corresponding model.
     *
     * @var string
     */
    protected $model = \App\Models\Incident::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'titre' => $this->faker->sentence(3),
            'statut' => $this->faker->randomElement(IncidentStatusEnum::toArray()),
            'message' => random_int(0, 1),
            'motif' => $this->faker->text(),
            'colis_id' => Colis::factory(),
            'user_id' => User::factory()
        ];
    }
}
