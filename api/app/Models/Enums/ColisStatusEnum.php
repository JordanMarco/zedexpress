<?php

namespace App\Models\Enums;

enum ColisStatusEnum: string
{
    case UNPAID = 'unpaid';
    case WAITING = 'waiting';
    case REMOVED = 'removed';
}
