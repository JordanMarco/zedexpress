<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        \App\Models\AccountType::factory(3)->create();
        \App\Models\User::factory(10)->create();
        \App\Models\Tarif::factory(10)->create();
        \App\Models\Colis::factory(10)->create();
    }
}
