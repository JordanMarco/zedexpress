<?php

namespace App\Http\Controllers\Others;

use App\Http\Controllers\Controller;
use App\Models\Enums\AccountTypeEnum;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $accountId = $request->input('account_id', null);
        $withPaginate = $request->input('with_paginate', true);

        if ($withPaginate) {
            $users = User::when($accountId, function ($query) use ($accountId) {
                return $query->where('account_id', $accountId);
            })->paginate(10);
        } else {
            $users = User::when($accountId, function ($query) use ($accountId) {
                return $query->where('account_id', $accountId);
            })->get();
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
            'account_id' => 'required|exists:account_types:id'
        ]);

        if ($validator->fails()) {
            return response()->json(['translate' => 'errors.validate'], 400);
        }

        $agent = new User;
        $agent->first_name = $request->first_name;
        $agent->last_name = $request->last_name;
        $agent->login = $request->login;
        $agent->account_id = $request->account_id;
        $agent->country = $request->country;
        $agent->password = Hash::make($request->password);
        $agent->cni = $request->cni;
        $agent->email = $request->email;
        $agent->phone = $request->phone;
        $agent->address = $request->address;

        $agent->save();

        return response()->json($agent);
    }

    public function update(Request $request, User $agent)
    {
        $data = $request->all();
        $validator = Validator::make($data, [
            'login' => 'required|unique:users,login',
            'email' => 'required|unique:users,email',
            'account_id' => 'required|exists:account_types:id'
        ]);

        if ($validator->fails()) {
            return response()->json(['translate' => 'errors.validate'], 400);
        }

        $agent->first_name = $request->first_name;
        $agent->last_name = $request->last_name;
        $agent->login = $request->login;
        $agent->account_id = $request->account_id;
        $agent->country = $request->country;

        if (isset($data['password'])) {
            $agent->password = Hash::make($request->password);
        }

        if (isset($data['account_id'])) {
            $agent->account_id = $data['account_id'];
        }

        $agent->cni = $request->cni;
        $agent->email = $request->email;
        $agent->phone = $request->phone;
        $agent->address = $request->address;

        $agent->save();
    }

    public function destroy(User $agent)
    {

        if ($agent->accountType->code === AccountTypeEnum::ADMIN->value || Auth::id() === $agent->id) {
            return response()->json(['translate' => 'errors.unauthorize']);
        }

        if ($agent->colis()->count() > 0) {
            return response()->json(['translate' => 'errors.existing-colis']);
        }

        $agent->delete();

        return response()->noContent();
    }
}
