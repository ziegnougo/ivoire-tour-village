<?php

namespace App\Filament\Resources\DevisRequests\Pages;

use App\Filament\Resources\DevisRequests\DevisRequestResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListDevisRequests extends ListRecords
{
    protected static string $resource = DevisRequestResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
