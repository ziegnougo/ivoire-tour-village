<?php

namespace App\Filament\Resources\Reservations\Schemas;

use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class ReservationForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('reference')
                    ->required(),
                Select::make('offre_id')
                    ->relationship('offre', 'titre')
                    ->searchable()
                    ->preload()
                    ->required(),
                TextInput::make('nom')
                    ->required(),
                TextInput::make('email')
                    ->label('Email')
                    ->email()
                    ->required(),
                DatePicker::make('date_experience')
                    ->required(),
                TextInput::make('nombre_personnes')
                    ->required()
                    ->numeric()
                    ->minValue(1),
                TextInput::make('prix_total')
                    ->required()
                    ->numeric()
                    ->minValue(0)
                    ->suffix('FCFA'),
                Select::make('statut')
                    ->options([
                        'en_attente' => 'En attente',
                        'confirmee' => 'Confirmée',
                        'annulee' => 'Annulée',
                    ])
                    ->required(),
            ]);
    }
}
