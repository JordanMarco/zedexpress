<?php

use App\Models\Enums\ColisStatusEnum;
use App\Models\Tarif;
use App\Models\User;
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
        Schema::create('colis', function (Blueprint $table) {
            $table->id();
            $table->string('nom')->nullable();
            $table->string('hour')->nullable();
            $table->string('hours')->nullable();
            $table->string('statut')->default(ColisStatusEnum::UNPAID->value);
            $table->string('nature')->nullable();
            $table->string('country')->nullable();
            $table->text('fragilite')->nullable();
            $table->date('date_entre')->nullable();
            $table->text('contenance')->nullable();
            $table->date('date_arrivee')->nullable();
            $table->unsignedInteger('who')->nullable();
            $table->unsignedDouble('poids')->nullable();
            $table->dateTime('date_depart')->nullable();
            $table->dateTime('date_arrive')->nullable();
            $table->unsignedDouble('hauteur')->nullable();
            $table->unsignedDouble('largeur')->nullable();
            $table->unsignedDouble('longueur')->nullable();
            $table->unsignedInteger('quantite')->nullable();
            $table->unsignedDouble('valeur_euro')->nullable();
            $table->foreignIdFor(User::class, 'receiver_id')->constrained('users')->noActionOnDelete();
            $table->foreignIdFor(User::class)->constrained()->noActionOnDelete();
            $table->foreignIdFor(Tarif::class)->constrained()->noActionOnDelete();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('colis');
    }
};
