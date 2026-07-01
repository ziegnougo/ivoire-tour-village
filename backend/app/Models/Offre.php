<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Offre extends Model
{
    protected $fillable = [
        'slug',
        'titre',
        'village_id',
        'description',
        'duree',
        'prix',
        'places_disponibles',
        'difficulte',
        'inclus',
        'non_inclus',
        'image',
    ];

    protected $casts = [
        'inclus' => 'array',
        'non_inclus' => 'array',
        'prix' => 'integer',
        'places_disponibles' => 'integer',
    ];

    public function village(): BelongsTo
    {
        return $this->belongsTo(Village::class);
    }

    public function reservations(): HasMany
    {
        return $this->hasMany(Reservation::class);
    }

    public function devisRequests(): HasMany
    {
        return $this->hasMany(DevisRequest::class);
    }
}
