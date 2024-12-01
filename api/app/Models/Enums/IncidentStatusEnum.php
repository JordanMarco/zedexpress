<?php

namespace App\Models\Enums;

enum IncidentStatusEnum: string
{
    case SOLVE = 'solve';
    case WAITING = 'waiting';

    public static function toArray(): array
    {
        return array_map(fn($case) => $case->value, self::cases());
    }
}
