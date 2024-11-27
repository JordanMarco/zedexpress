<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Colis extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function tarif() {
        return $this->belongsTo(Tarif::class);
    }

    public function receiver() {
        return $this->belongsTo(User::class, 'receiver_id');
    }

    public function user() {
        return $this->belongsTo(User::class);
    }
}
