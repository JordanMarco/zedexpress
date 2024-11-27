<?php

namespace Database\Factories;

use App\Models\Tarif;
use Illuminate\Database\Eloquent\Factories\Factory;

class TarifFactory extends Factory
{
    protected $model = Tarif::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'montant' => $this->faker->randomFloat(2, 10, 1000), // Montant aléatoire entre 10 et 1000
            'libelle' => $this->faker->words(3, true), // Trois mots aléatoires pour le libellé
        ];
    }
}
