<?php

namespace Database\Factories;

use App\Models\Colis;
use App\Models\Constants\Constants;
use App\Models\Enums\ColisStatusEnum;
use App\Models\User;
use App\Models\Tarif;
use Illuminate\Database\Eloquent\Factories\Factory;

class ColisFactory extends Factory
{
    protected $model = Colis::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $quantite = $this->faker->numberBetween(1, 100);
        return [
            'nom' => $this->faker->word(),
            'hour' => $this->faker->time(),
            'hours' => $this->faker->time(),
            'statut' => ColisStatusEnum::UNPAID->value,
            'nature' => $this->faker->randomElement(['documents', 'electronics', 'clothes']),
            'country' => $this->faker->randomElement(Constants::COUNTRIES),
            'fragilite' => $this->faker->boolean() ? 'oui' : 'non',
            'date_entre' => $this->faker->date(),
            'contenance' => $this->faker->sentence(),
            'date_arrivee' => $this->faker->date(),
            'who' => $this->faker->numberBetween(1, 10),
            'poids' => $this->faker->randomFloat(2, 0.1, 50),
            'date_depart' => $this->faker->dateTimeBetween('-1 week', '+1 week'),
            'date_arrive' => $this->faker->dateTimeBetween('+1 week', '+2 weeks'),
            'hauteur' => $this->faker->randomFloat(2, 10, 200),
            'largeur' => $this->faker->randomFloat(2, 10, 200),
            'receiver_id' => User::factory(),
            'longueur' => $this->faker->randomFloat(2, 10, 200),
            'quantite' => $quantite,
            'valeur_euro' => $this->faker->randomFloat(2, 10, 1000) * $quantite,
            'user_id' => User::factory(),
            'tarif_id' => Tarif::factory()
        ];
    }
}
