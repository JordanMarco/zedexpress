<?php

namespace Database\Factories;

use App\Models\AccountType;
use Illuminate\Database\Eloquent\Factories\Factory;

class AccountTypeFactory extends Factory
{
    protected $model = AccountType::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'code' => $this->faker->regexify('[A-Z]{3}[0-9]{2}'), // Exemple : ABC12
            'label' => $this->faker->words(3, true), // Exemple : "Compte Premium"
            'possible' => $this->faker->numberBetween(1, 100), // Nombre d'actions possibles
            'country' => $this->faker->country(), // Pays aléatoire
        ];
    }
}
