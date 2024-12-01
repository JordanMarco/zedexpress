<?php

namespace App\Http\Controllers\Others;

use App\Http\Controllers\Controller;
use App\Models\Enums\AccountTypeEnum;
use App\Models\User;
use Illuminate\Http\Request;

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
}
