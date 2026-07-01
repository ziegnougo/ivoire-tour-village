<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('devis_requests', function (Blueprint $table) {
            $table->id();
            $table->foreignId('offre_id')->constrained('offres')->cascadeOnDelete();
            $table->string('nom');
            $table->string('email');
            $table->string('telephone');
            $table->unsignedInteger('nombre_personnes')->nullable();
            $table->date('date_souhaitee')->nullable();
            $table->text('message')->nullable();
            $table->enum('statut', ['nouveau', 'traite'])->default('nouveau');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('devis_requests');
    }
};
