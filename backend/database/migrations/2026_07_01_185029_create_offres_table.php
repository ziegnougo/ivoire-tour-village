<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('offres', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('titre');
            $table->foreignId('village_id')->constrained('villages')->cascadeOnDelete();
            $table->text('description');
            $table->string('duree');
            $table->unsignedInteger('prix');
            $table->unsignedInteger('places_disponibles');
            $table->enum('difficulte', ['Facile', 'Modéré', 'Difficile']);
            $table->json('inclus')->default('[]');
            $table->json('non_inclus')->default('[]');
            $table->string('image')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('offres');
    }
};
