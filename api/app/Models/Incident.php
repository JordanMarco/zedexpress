<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Incident extends Model
{
    use HasFactory;

    protected $guarded = [];
    protected $with = ['client', 'colis'];

    public function client(): BelongsTo
    {
        return $this->belongsTo(Client::class);
    }

    public function colis(): BelongsTo
    {
        return $this->belongsTo(Colis::class);
    }
}
