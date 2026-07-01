<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('villages', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('nom');
            $table->string('region');
            $table->text('resume');
            $table->text('histoire');
            $table->text('patrimoine');
            $table->json('activites')->default('[]');
            $table->json('hebergements')->default('[]');
            $table->json('artisans')->default('[]');
            $table->json('evenements')->default('[]');
            $table->decimal('latitude', 10, 6);
            $table->decimal('longitude', 10, 6);
            $table->string('image')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('villages');
    }
};
