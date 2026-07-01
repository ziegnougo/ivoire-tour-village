<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class DevisRequest extends Model
{
    protected $fillable = [
        'offre_id',
        'nom',
        'email',
        'telephone',
        'nombre_personnes',
        'date_souhaitee',
        'message',
        'statut',
    ];

    protected $casts = [
        'date_souhaitee' => 'date',
        'nombre_personnes' => 'integer',
    ];

    public function offre(): BelongsTo
    {
        return $this->belongsTo(Offre::class);
    }
}
