<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Offre;
use Illuminate\Http\Request;

class OffreController extends Controller
{
    public function index(Request $request)
    {
        $offres = Offre::query()
            ->with('village')
            ->when($request->string('village')->toString(), fn ($query, $slug) => $query->whereHas('village', fn ($v) => $v->where('slug', $slug)))
            ->when($request->string('difficulte')->toString(), fn ($query, $difficulte) => $query->where('difficulte', $difficulte))
            ->when($request->integer('prix_max'), fn ($query, $prixMax) => $query->where('prix', '<=', $prixMax))
            ->when($request->string('q')->toString(), function ($query, $q) {
                $query->where(function ($sub) use ($q) {
                    $sub->where('titre', 'ilike', "%{$q}%")
                        ->orWhere('description', 'ilike', "%{$q}%");
                });
            })
            ->orderBy('titre')
            ->get();

        return response()->json($offres);
    }

    public function show(string $slug)
    {
        $offre = Offre::where('slug', $slug)
            ->with('village')
            ->firstOrFail();

        return response()->json($offre);
    }
}
