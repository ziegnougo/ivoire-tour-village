<?php

namespace App\Filament\Resources\Offres\Pages;

use App\Filament\Resources\Offres\OffreResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListOffres extends ListRecords
{
    protected static string $resource = OffreResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
