<?php

namespace App\Filament\Resources\DevisRequests\Schemas;

use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Schemas\Schema;

class DevisRequestForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Select::make('offre_id')
                    ->relationship('offre', 'titre')
                    ->searchable()
                    ->preload()
                    ->required(),
                TextInput::make('nom')
                    ->required(),
                TextInput::make('email')
                    ->label('Email address')
                    ->email()
                    ->required(),
                TextInput::make('telephone')
                    ->tel()
                    ->required(),
                TextInput::make('nombre_personnes')
                    ->numeric(),
                DatePicker::make('date_souhaitee'),
                Textarea::make('message')
                    ->columnSpanFull(),
                Select::make('statut')
                    ->options([
                        'nouveau' => 'Nouveau',
                        'traite' => 'Traité',
                    ])
                    ->required(),
            ]);
    }
}
