<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Offre;
use App\Models\Reservation;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class ReservationController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'offre_slug' => ['required', Rule::exists('offres', 'slug')],
            'nom' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email'],
            'date_experience' => ['required', 'date', 'after:today'],
            'nombre_personnes' => ['required', 'integer', 'min:1'],
        ]);

        $offre = Offre::where('slug', $validated['offre_slug'])->firstOrFail();

        if ($validated['nombre_personnes'] > $offre->places_disponibles) {
            return response()->json([
                'message' => 'Le nombre de personnes dépasse les places disponibles.',
            ], 422);
        }

        $reservation = Reservation::create([
            'reference' => 'ITV-'.strtoupper(Str::random(6)),
            'offre_id' => $offre->id,
            'nom' => $validated['nom'],
            'email' => $validated['email'],
            'date_experience' => $validated['date_experience'],
            'nombre_personnes' => $validated['nombre_personnes'],
            'prix_total' => $offre->prix * $validated['nombre_personnes'],
            'statut' => 'confirmee',
        ]);

        return response()->json($reservation, 201);
    }
}
