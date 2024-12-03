<?php

namespace App\Policies;

use App\Models\AccountType;
use App\Models\Enums\AccountTypeEnum;
use App\Models\User;
use Illuminate\Auth\Access\Response;
use Illuminate\Support\Facades\Gate;

class AccountTypePolicy
{

    /**
     * Perform pre-authorization checks.
     */
    public function before(User $user): bool|null
    {
        if (!Gate::allows('has_account_type', [AccountTypeEnum::ADMIN])) {
            return true;
        }

        return null;
    }

    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return true;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, AccountType $accountType): bool
    {
        return false;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return false;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, AccountType $accountType): bool
    {
        return false;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, AccountType $accountType): bool
    {
        return false;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, AccountType $accountType): bool
    {
        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, AccountType $accountType): bool
    {
        return false;
    }
}
