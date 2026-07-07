<?php

namespace App\Filament\Resources\Villages\Schemas;

use Filament\Forms\Components\TagsInput;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Schemas\Schema;

class VillageForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('slug')
                    ->required()
                    ->unique(ignoreRecord: true)
                    ->helperText('Identifiant unique utilisé dans les URLs (ex: tiagba).'),
                TextInput::make('nom')
                    ->required(),
                TextInput::make('region')
                    ->required(),
                Textarea::make('resume')
                    ->required()
                    ->columnSpanFull(),
                Textarea::make('histoire')
                    ->required()
                    ->columnSpanFull(),
                Textarea::make('patrimoine')
                    ->required()
                    ->columnSpanFull(),
                TagsInput::make('activites')
                    ->required()
                    ->columnSpanFull(),
                TagsInput::make('hebergements')
                    ->required()
                    ->columnSpanFull(),
                TagsInput::make('artisans')
                    ->required()
                    ->columnSpanFull(),
                TagsInput::make('evenements')
                    ->required()
                    ->columnSpanFull(),
                TextInput::make('latitude')
                    ->required()
                    ->numeric(),
                TextInput::make('longitude')
                    ->required()
                    ->numeric(),
                TextInput::make('image')
                    ->helperText('Chemin ou URL de l\'image (ex: /villages/tiagba.svg).'),
            ]);
    }
}
