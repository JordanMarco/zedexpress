<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class ClientFactory extends Factory
{
    /**
     * The name of the corresponding model.
     *
     * @var string
     */
    protected $model = \App\Models\Client::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'cni' => $this->faker->unique()->bothify('CNI#######'),
            'phone' => $this->faker->unique()->phoneNumber(),
            'gender' => $this->faker->randomElement(['M', 'F', 'O']),
            'address' => $this->faker->address(),
            'first_name' => $this->faker->firstName(),
            'last_name' => $this->faker->lastName(),
            'email' => $this->faker->unique()->safeEmail()
        ];
    }
}
