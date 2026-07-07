<?php

namespace App\Filament\Resources\Offres\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class OffresTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('slug')
                    ->searchable(),
                TextColumn::make('titre')
                    ->searchable(),
                TextColumn::make('village.nom')
                    ->label('Village')
                    ->searchable(),
                TextColumn::make('duree')
                    ->searchable(),
                TextColumn::make('prix')
                    ->numeric()
                    ->sortable()
                    ->suffix(' FCFA'),
                TextColumn::make('places_disponibles')
                    ->numeric()
                    ->sortable(),
                TextColumn::make('difficulte')
                    ->badge()
                    ->searchable(),
                TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                //
            ])
            ->recordActions([
                EditAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
