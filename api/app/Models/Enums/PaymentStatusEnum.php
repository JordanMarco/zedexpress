<?php

namespace App\Models\Enums;

enum PaymentStatusEnum: string
{
    case PENDING = 'pending';
    case PAYED = 'payed';
    case CANCELLED = 'cancelled';
    case FAILED = 'failed';

    public static function toArray(): array
    {
        return array_map(fn ($case) => $case->value, self::cases());
    }
}
