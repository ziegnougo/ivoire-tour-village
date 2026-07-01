<?php

use App\Http\Controllers\Api\ContactMessageController;
use App\Http\Controllers\Api\DevisRequestController;
use App\Http\Controllers\Api\OffreController;
use App\Http\Controllers\Api\ReservationController;
use App\Http\Controllers\Api\VillageController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/villages', [VillageController::class, 'index']);
Route::get('/villages/{slug}', [VillageController::class, 'show']);

Route::get('/offres', [OffreController::class, 'index']);
Route::get('/offres/{slug}', [OffreController::class, 'show']);

Route::post('/reservations', [ReservationController::class, 'store']);
Route::post('/devis-requests', [DevisRequestController::class, 'store']);
Route::post('/contact-messages', [ContactMessageController::class, 'store']);
