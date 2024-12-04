<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\AccountType;
use App\Models\Constants\Constants;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Models\Enums\LanguageEnum;

class UserFactory extends Factory
{
    protected $model = User::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'cni' => $this->faker->optional()->regexify('[0-9]{13}'), // 13 chiffres
            'phone' => $this->faker->phoneNumber(),
            'country' => $this->faker->randomElement(Constants::COUNTRIES),
            'address' => $this->faker->optional()->address(),
            'first_name' => $this->faker->firstName(),
            'last_name' => $this->faker->lastName(),
            'email' => $this->faker->unique()->safeEmail(),
            'login' => $this->faker->unique()->userName(),
            'language_code' => LanguageEnum::FR->value,
            'account_id' => AccountType::factory(),
            'email_verified_at' => $this->faker->optional()->dateTime(),
            'password' => bcrypt('password'),
            'remember_token' => Str::random(10),
        ];
    }
}
