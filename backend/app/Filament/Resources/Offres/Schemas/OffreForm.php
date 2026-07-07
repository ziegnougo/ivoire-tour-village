<?php

namespace App\Filament\Resources\Offres\Schemas;

use Filament\Forms\Components\Select;
use Filament\Forms\Components\TagsInput;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Schemas\Schema;

class OffreForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('slug')
                    ->required()
                    ->unique(ignoreRecord: true)
                    ->helperText('Identifiant unique utilisé dans les URLs.'),
                TextInput::make('titre')
                    ->required(),
                Select::make('village_id')
                    ->relationship('village', 'nom')
                    ->searchable()
                    ->preload()
                    ->required(),
                Textarea::make('description')
                    ->required()
                    ->columnSpanFull(),
                TextInput::make('duree')
                    ->required()
                    ->helperText('Ex: 4 heures, 1 journée, 2 jours / 1 nuit.'),
                TextInput::make('prix')
                    ->required()
                    ->numeric()
                    ->minValue(0)
                    ->suffix('FCFA'),
                TextInput::make('places_disponibles')
                    ->required()
                    ->numeric()
                    ->minValue(0),
                Select::make('difficulte')
                    ->options([
                        'Facile' => 'Facile',
                        'Modéré' => 'Modéré',
                        'Difficile' => 'Difficile',
                    ])
                    ->required(),
                TagsInput::make('inclus')
                    ->required()
                    ->columnSpanFull(),
                TagsInput::make('non_inclus')
                    ->required()
                    ->columnSpanFull(),
                TextInput::make('image')
                    ->helperText('Chemin ou URL de l\'image (ex: /offres/tiagba-pirogue.svg).'),
            ]);
    }
}
