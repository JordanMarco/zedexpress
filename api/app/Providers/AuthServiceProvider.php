<?php

namespace App\Providers;

// use Illuminate\Support\Facades\Gate;

use App\Models\Enums\AccountTypeEnum;
use App\Models\User;
use App\Policies\UserPolicy;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        // User::class => UserPolicy::class
    ];

    /**
     * Register any authentication / authorization services.
     */
    public function boot(): void
    {
        Gate::define('has_account_type', function (User $user, AccountTypeEnum $code, string $country = null) {
            return $user->account->code === $code->value &&
                (isset($country) ? $country === $user->account->country : true);
        });
    }
}
