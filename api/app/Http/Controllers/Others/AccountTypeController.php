<?php

namespace App\Http\Controllers\Others;

use App\Http\Controllers\Controller;
use App\Models\AccountType;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AccountTypeController extends Controller
{
    public function index(Request $request)
    {
        $withPaginate = $request->input('with_paginate', true);

        if ($withPaginate === true) {
            $accountTypes = AccountType::paginate(10);
        } else {
            $accountTypes = AccountType::all();
        }

        return response()->json($accountTypes);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'code' => 'required',
            'label' => 'required',
            'country' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json(['translate' => 'errors.validate'], 400);
        }

        $accountType = new AccountType();
        $accountType->code = $request->code;
        $accountType->label = $request->label;
        $accountType->country = $request->country;
        $accountType->save();

        return response()->json($accountType);
    }

    public function update(Request $request, AccountType $accountType)
    {
        $validator = Validator::make($request->all(), [
            'code' => 'required',
            'label' => 'required',
            'country' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json(['translate' => 'errors.validate'], 400);
        }

        $accountType->code = $request->code;
        $accountType->label = $request->label;
        $accountType->country = $request->country;
        $accountType->save();

        return response()->json($accountType);
    }

    public function destroy(AccountType $accountType)
    {
        $accountType->delete();
        return response()->noContent();
    }
}
