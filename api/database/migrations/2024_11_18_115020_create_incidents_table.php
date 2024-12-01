<?php

use App\Models\Client;
use App\Models\Colis;
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
            $table->foreignIdFor(Client::class)->constrained()->noActionOnDelete();
            $table->foreignIdFor(Colis::class)->constrained()->noActionOnDelete();
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
