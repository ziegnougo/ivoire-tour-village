<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Reservation extends Model
{
    protected $fillable = [
        'reference',
        'offre_id',
        'nom',
        'email',
        'date_experience',
        'nombre_personnes',
        'prix_total',
        'statut',
    ];

    protected $casts = [
        'date_experience' => 'date',
        'nombre_personnes' => 'integer',
        'prix_total' => 'integer',
    ];

    public function offre(): BelongsTo
    {
        return $this->belongsTo(Offre::class);
    }
}
