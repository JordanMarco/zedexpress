<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = ['first_name', 'last_name', 'login', 'password', 'password_eph', 'phone', 'cni', 'adress'];

    protected $guarded = [];

    protected $with = ['account'];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];


    public function colis(): HasMany
    {
        return $this->hasMany(Colis::class);
    }

    public function account(): BelongsTo
    {
        return $this->belongsTo(AccountType::class, 'account_id');
    }

    public function receiveColis(): HasMany
    {
        return $this->hasMany(Colis::class, 'receiver_id');
    }
}
