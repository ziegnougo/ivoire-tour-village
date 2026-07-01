<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\DevisRequest;
use App\Models\Offre;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class DevisRequestController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'offre_slug' => ['required', Rule::exists('offres', 'slug')],
            'nom' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email'],
            'telephone' => ['required', 'string', 'max:30'],
            'nombre_personnes' => ['nullable', 'integer', 'min:1'],
            'date_souhaitee' => ['nullable', 'date'],
            'message' => ['nullable', 'string'],
        ]);

        $offre = Offre::where('slug', $validated['offre_slug'])->firstOrFail();

        $devisRequest = DevisRequest::create([
            'offre_id' => $offre->id,
            'nom' => $validated['nom'],
            'email' => $validated['email'],
            'telephone' => $validated['telephone'],
            'nombre_personnes' => $validated['nombre_personnes'] ?? null,
            'date_souhaitee' => $validated['date_souhaitee'] ?? null,
            'message' => $validated['message'] ?? null,
            'statut' => 'nouveau',
        ]);

        return response()->json($devisRequest, 201);
    }
}
