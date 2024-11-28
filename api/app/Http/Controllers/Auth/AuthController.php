<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $data = $request->all();
        $validator = Validator::make($data, [
            'login' => 'required|exists:users,login',
            'password' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json(['translate' => 'errors.validate'], 400);
        }

        $user = User::where('login', $data['login'])->first();
        if (!isset($user) || !Hash::check($data['password'], $user->password)) {
            return response()->json(['translate' => 'errors.not-match-credential'], 400);
        }

        $token = $user->createToken('credential');

        return response()->json([
            'token' => $token->plainTextToken,
            'user' => $user,
            'token_type' => 'Bearer Token'
        ], 200);
    }

    public function logout() {
        Auth::logout();
        return response()->noContent();
    }
}
