<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Village extends Model
{
    protected $fillable = [
        'slug',
        'nom',
        'region',
        'resume',
        'histoire',
        'patrimoine',
        'activites',
        'hebergements',
        'artisans',
        'evenements',
        'latitude',
        'longitude',
        'image',
    ];

    protected $casts = [
        'activites' => 'array',
        'hebergements' => 'array',
        'artisans' => 'array',
        'evenements' => 'array',
        'latitude' => 'decimal:6',
        'longitude' => 'decimal:6',
    ];

    public function offres(): HasMany
    {
        return $this->hasMany(Offre::class);
    }
}
