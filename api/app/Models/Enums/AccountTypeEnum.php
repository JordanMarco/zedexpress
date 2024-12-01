<?php

namespace App\Models\Enums;

enum AccountTypeEnum: string
{
    case ADMIN = 'ADM';
    case CLIENT = 'CLT';
    case AGENT = 'AGT';

    public static function toArray(): array
    {
        return array_map(fn($case) => $case->value, self::cases());
    }
}
