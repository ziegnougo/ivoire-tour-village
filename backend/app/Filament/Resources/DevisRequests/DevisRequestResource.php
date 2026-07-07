<?php

namespace App\Filament\Resources\DevisRequests;

use App\Filament\Resources\DevisRequests\Pages\CreateDevisRequest;
use App\Filament\Resources\DevisRequests\Pages\EditDevisRequest;
use App\Filament\Resources\DevisRequests\Pages\ListDevisRequests;
use App\Filament\Resources\DevisRequests\Schemas\DevisRequestForm;
use App\Filament\Resources\DevisRequests\Tables\DevisRequestsTable;
use App\Models\DevisRequest;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class DevisRequestResource extends Resource
{
    protected static ?string $model = DevisRequest::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedDocumentText;

    protected static ?string $modelLabel = 'demande de devis';

    protected static ?string $pluralModelLabel = 'demandes de devis';

    public static function form(Schema $schema): Schema
    {
        return DevisRequestForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return DevisRequestsTable::configure($table);
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
            'index' => ListDevisRequests::route('/'),
            'create' => CreateDevisRequest::route('/create'),
            'edit' => EditDevisRequest::route('/{record}/edit'),
        ];
    }
}
