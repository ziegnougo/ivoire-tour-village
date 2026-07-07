<?php

namespace App\Filament\Resources\Reservations\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;

class ReservationsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->defaultSort('created_at', 'desc')
            ->columns([
                TextColumn::make('reference')
                    ->searchable(),
                TextColumn::make('offre.titre')
                    ->label('Offre')
                    ->searchable(),
                TextColumn::make('nom')
                    ->searchable(),
                TextColumn::make('email')
                    ->searchable(),
                TextColumn::make('date_experience')
                    ->date()
                    ->sortable(),
                TextColumn::make('nombre_personnes')
                    ->numeric()
                    ->sortable(),
                TextColumn::make('prix_total')
                    ->numeric()
                    ->sortable()
                    ->suffix(' FCFA'),
                TextColumn::make('statut')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'confirmee' => 'success',
                        'annulee' => 'danger',
                        default => 'warning',
                    })
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
                SelectFilter::make('statut')
                    ->options([
                        'en_attente' => 'En attente',
                        'confirmee' => 'Confirmée',
                        'annulee' => 'Annulée',
                    ]),
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
