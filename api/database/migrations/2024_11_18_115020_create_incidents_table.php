<?php

use App\Models\Colis;
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
        Schema::create('incidents', function (Blueprint $table) {
            $table->id();
            $table->string('titre')->nullable();
            $table->string('statut')->nullable();
            $table->integer('message')->nullable();
            $table->text('motif')->nullable();
            $table->foreignIdFor(Colis::class)->constrained()->noActionOnDelete();
            $table->foreignIdFor(User::class)->constrained()->noActionOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('incidents');
    }
};
