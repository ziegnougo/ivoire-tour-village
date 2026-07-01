<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('reservations', function (Blueprint $table) {
            $table->id();
            $table->string('reference')->unique();
            $table->foreignId('offre_id')->constrained('offres')->cascadeOnDelete();
            $table->string('nom');
            $table->string('email');
            $table->date('date_experience');
            $table->unsignedInteger('nombre_personnes');
            $table->unsignedInteger('prix_total');
            $table->enum('statut', ['en_attente', 'confirmee', 'annulee'])->default('confirmee');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('reservations');
    }
};
