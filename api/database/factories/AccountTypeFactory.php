<?php

namespace Database\Factories;

use App\Models\AccountType;
use App\Models\Enums\AccountTypeEnum;
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
            'code' => $this->faker->randomElement(AccountTypeEnum::toArray()),
            'label' => $this->faker->words(3, true), // Exemple : "Compte Premium"
            'possible' => $this->faker->numberBetween(1, 100), // Nombre d'actions possibles
            'country' => $this->faker->country(), // Pays aléatoire
        ];
    }
}
