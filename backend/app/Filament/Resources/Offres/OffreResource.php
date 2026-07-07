<?php

namespace App\Filament\Resources\Offres;

use App\Filament\Resources\Offres\Pages\CreateOffre;
use App\Filament\Resources\Offres\Pages\EditOffre;
use App\Filament\Resources\Offres\Pages\ListOffres;
use App\Filament\Resources\Offres\Schemas\OffreForm;
use App\Filament\Resources\Offres\Tables\OffresTable;
use App\Models\Offre;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class OffreResource extends Resource
{
    protected static ?string $model = Offre::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedTicket;

    protected static ?string $modelLabel = 'offre';

    protected static ?string $pluralModelLabel = 'offres';

    public static function form(Schema $schema): Schema
    {
        return OffreForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return OffresTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListOffres::route('/'),
            'create' => CreateOffre::route('/create'),
            'edit' => EditOffre::route('/{record}/edit'),
        ];
    }
}
