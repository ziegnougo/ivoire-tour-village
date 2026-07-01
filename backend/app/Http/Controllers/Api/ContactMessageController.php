<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ContactMessage;
use Illuminate\Http\Request;

class ContactMessageController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nom' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email'],
            'sujet' => ['required', 'string', 'max:255'],
            'message' => ['required', 'string'],
        ]);

        $contactMessage = ContactMessage::create([
            ...$validated,
            'statut' => 'nouveau',
        ]);

        return response()->json($contactMessage, 201);
    }
}
