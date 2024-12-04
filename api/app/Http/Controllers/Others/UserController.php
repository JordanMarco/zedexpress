<?php

namespace App\Http\Controllers\Others;

use App\Http\Controllers\Controller;
use App\Models\Enums\AccountTypeEnum;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function __construct()
    {
        // $this->authorizeResource(User::class, 'user');
    }

    public function index(Request $request)
    {
        $search = '%' . $request->input('search', '') . '%';
        $accountId = $request->input('account_id', null);
        $withPaginate = $request->input('with_paginate', true);
        $perPage = $request->input('per_page', 10);

        if ($withPaginate != 'false') {
            $users = User::when($accountId, function ($query) use ($accountId) {
                return $query->where('account_id', $accountId);
            })->where(function ($query) use ($search) {
                $query->orWhere('first_name', 'LIKE', $search)
                    ->orWhere('last_name', 'LIKE', $search);
            })->latest()->paginate($perPage);
        } else {
            $users = User::when($accountId, function ($query) use ($accountId) {
                return $query->where('account_id', $accountId);
            })->where(function ($query) use ($search) {
                $query->orWhere('first_name', 'LIKE', $search)
                    ->orWhere('last_name', 'LIKE', $search);
            })->latest()->get();
        }

        return response()->json($users);
    }

    public function store(Request $request)
    {
        $data = $request->all();
        $validator = Validator::make($data, [
            'login' => 'required|unique:users,login',
            'email' => 'required|unique:users,email',
            'password' => 'required|confirmed',
            'account_id' => 'required|exists:account_types,id'
        ]);

        if ($validator->fails()) {
            return response()->json(['translate' => 'errors.validate'], 400);
        }

        $user = new User;
        $user->first_name = $request->first_name;
        $user->last_name = $request->last_name;
        $user->login = $request->login;
        $user->account_id = $request->account_id;
        $user->country = $request->country;
        $user->password = Hash::make($request->password);
        $user->cni = $request->cni;
        $user->email = $request->email;
        $user->phone = $request->phone;
        $user->address = $request->address;

        $user->save();

        return response()->json($user);
    }

    public function update(Request $request, User $user)
    {
        $data = $request->all();
        $validator = Validator::make($data, [
            'login' => 'required|unique:users,login,' . $user->id,
            'email' => 'required|unique:users,email,' . $user->id,
            'account_id' => 'required|exists:account_types,id'
        ]);

        if ($validator->fails()) {
            return response()->json(['translate' => 'errors.validate', 'message' => $validator->messages()], 400);
        }

        $user->first_name = $request->first_name;
        $user->last_name = $request->last_name;
        $user->login = $request->login;
        $user->account_id = $request->account_id;
        $user->country = $request->country;

        if (isset($data['password'])) {
            $user->password = Hash::make($request->password);
        }

        if (isset($data['account_id'])) {
            $user->account_id = $data['account_id'];
        }

        $user->cni = $request->cni;
        $user->email = $request->email;
        $user->phone = $request->phone;
        $user->address = $request->address;

        $user->save();
        return response()->json($user);
    }

    public function destroy(User $user)
    {
        if ($user->account->code === AccountTypeEnum::ADMIN->value || Auth::id() === $user->id) {
            return response()->json(['translate' => 'errors.unauthorize'], 401);
        }

        if ($user->colis()->count() > 0) {
            return response()->json(['translate' => 'errors.existing-colis'], 400);
        }

        if ($user->receiveColis()->count() > 0) {
            return response()->json(['translate' => 'errors.existing-colis'], 400);
        }

        $user->delete();

        return response()->noContent();
    }
}
