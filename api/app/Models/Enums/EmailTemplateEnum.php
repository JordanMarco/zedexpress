<?php

namespace App\Models\Enums;

enum EmailTemplateEnum: string
{
    case DEPOSITE = 'emails.colis-deposit';
    case WITHDRAWAL = 'emails.colis-withdrawal';
}
