<?php

namespace App\Http\Controllers\Others;

use App\Http\Controllers\Controller;
use App\Models\AccountType;
use Illuminate\Http\Request;

class AccountTypeController extends Controller
{
    public function index(Request $request)
    {
        $withPaginate = $request->input('with_paginate', true);

        if ($withPaginate) {
            $accountTypes = AccountType::paginate(10);
        } else {
            $accountTypes = AccountType::all();
        }

        return response()->json($accountTypes);
    }
}
