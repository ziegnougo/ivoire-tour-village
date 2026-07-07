<?php

namespace App\Filament\Resources\Offres\Pages;

use App\Filament\Resources\Offres\OffreResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditOffre extends EditRecord
{
    protected static string $resource = OffreResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
