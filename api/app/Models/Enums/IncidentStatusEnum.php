<?php

namespace App\Models\Enums;

enum IncidentStatusEnum: string
{
    case SOLVE = 'solve';
    case WAITING = 'waiting';
}
