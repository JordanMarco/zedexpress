<?php

namespace App\Http\Controllers\Others;

use App\Http\Controllers\Controller;
use App\Models\AccountType;
use App\Models\Enums\AccountTypeEnum;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class ClientController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $withPaginate = $request->input('with_paginate', true);
        $perPage = $request->input('per_page', 10);
        $search = '%' . $request->input('search', '') . '%';

        if ($withPaginate) {
            $clients = User::whereHas('account', function ($query) {
                $query->where('code', AccountTypeEnum::CLIENT->value);
            })->where(function ($query) use ($search) {
                $query->orWhere('first_name', 'LIKE', $search)
                    ->orWhere('last_name', 'LIKE', $search);
            })->paginate($perPage);
        } else {
            $clients = User::whereHas('account', function ($query) {
                $query->where('code', AccountTypeEnum::CLIENT->value);
            })->where(function ($query) use ($search) {
                $query->orWhere('first_name', 'LIKE', $search)
                    ->orWhere('last_name', 'LIKE', $search);
            })->get();
        }

        return response()->json($clients);
    }

    public function store(Request $request)
    {
        $data = $request->all();
        $validator = Validator::make($data, [
            'login' => 'required|unique:users,login',
            'email' => 'required|unique:users,email',
            'password' => 'required|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json(['translate' => 'errors.validate', 'message' => $validator->messages()], 400);
        }

        $account = AccountType::where('code', AccountTypeEnum::CLIENT->value)->first();
        if (!isset($account)) {
            $account = AccountType::create([
                'code' => AccountTypeEnum::CLIENT->value,
            ]);
        }

        $user = new User;
        $user->first_name = $request->first_name;
        $user->last_name = $request->last_name;
        $user->login = $request->login;
        $user->account_id = $account->id;
        $user->country = $request->country;
        $user->password = Hash::make($request->password);
        $user->cni = $request->cni;
        $user->email = $request->email;
        $user->phone = $request->phone;
        $user->address = $request->address;

        $user->save();

        return response()->json($user);
    }

    public function update(Request $request, User $client)
    {
        $data = $request->all();
        $validator = Validator::make($data, [
            'login' => 'required|unique:users,login,' . $client->id,
            'email' => 'required|unique:users,email,' . $client->id,
        ]);

        if ($validator->fails()) {
            return response()->json(['translate' => 'errors.validate', 'message' => $validator->messages()], 400);
        }

        if ($request->first_name)
            $client->first_name = $request->first_name;

        if ($request->last_name)
            $client->last_name = $request->last_name;

        $client->login = $request->login;
        $client->email = $request->email;

        if (isset($data['password'])) {
            $client->password = Hash::make($request->password);
        }


        if ($request->cni)
            $client->cni = $request->cni;

        if ($request->phone)
            $client->phone = $request->phone;


        if ($request->address)
            $client->address = $request->address;

        $client->save();
        return response()->json($client);
    }
}
