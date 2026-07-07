<?php

namespace App\Filament\Resources\DevisRequests\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;

class DevisRequestsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->defaultSort('created_at', 'desc')
            ->columns([
                TextColumn::make('offre.titre')
                    ->label('Offre')
                    ->searchable(),
                TextColumn::make('nom')
                    ->searchable(),
                TextColumn::make('email')
                    ->searchable(),
                TextColumn::make('telephone')
                    ->searchable(),
                TextColumn::make('nombre_personnes')
                    ->numeric()
                    ->sortable(),
                TextColumn::make('date_souhaitee')
                    ->date()
                    ->sortable(),
                TextColumn::make('statut')
                    ->badge()
                    ->color(fn (string $state): string => $state === 'traite' ? 'success' : 'warning')
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
                        'nouveau' => 'Nouveau',
                        'traite' => 'Traité',
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
