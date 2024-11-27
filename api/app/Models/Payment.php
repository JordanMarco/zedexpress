<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Payment extends Model
{
    use HasFactory;

    protected static function booted(): void
    {
        static::creating(function ($payment) {
            $payment->uuid = Str::uuid();
        });
    }

    protected $guarded = [];

    public function colis()
    {
        return $this->belongsTo(Colis::class);
    }
}
