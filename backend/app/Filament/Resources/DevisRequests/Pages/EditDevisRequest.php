<?php

namespace App\Filament\Resources\DevisRequests\Pages;

use App\Filament\Resources\DevisRequests\DevisRequestResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditDevisRequest extends EditRecord
{
    protected static string $resource = DevisRequestResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
