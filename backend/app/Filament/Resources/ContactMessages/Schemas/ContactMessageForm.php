<?php

namespace App\Filament\Resources\ContactMessages\Schemas;

use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Schemas\Schema;

class ContactMessageForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('nom')
                    ->required(),
                TextInput::make('email')
                    ->label('Email address')
                    ->email()
                    ->required(),
                TextInput::make('sujet')
                    ->required(),
                Textarea::make('message')
                    ->required()
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
