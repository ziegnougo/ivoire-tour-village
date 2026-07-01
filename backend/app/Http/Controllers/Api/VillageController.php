<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Village;
use Illuminate\Http\Request;

class VillageController extends Controller
{
    public function index(Request $request)
    {
        $villages = Village::query()
            ->when($request->string('region')->toString(), fn ($query, $region) => $query->where('region', $region))
            ->when($request->string('q')->toString(), function ($query, $q) {
                $query->where(function ($sub) use ($q) {
                    $sub->where('nom', 'ilike', "%{$q}%")
                        ->orWhere('resume', 'ilike', "%{$q}%");
                });
            })
            ->orderBy('nom')
            ->get();

        return response()->json($villages);
    }

    public function show(string $slug)
    {
        $village = Village::where('slug', $slug)
            ->with('offres')
            ->firstOrFail();

        return response()->json($village);
    }
}
