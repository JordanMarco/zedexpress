<?php

namespace App\Models\Enums;

enum AccountTypeEnum: string
{
    case ADMIN = 'admin';
    case CLIENT = 'client';
    case AGENT = 'agent';
}
