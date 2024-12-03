<?php

namespace App\Http\Controllers\Others;

use App\Http\Controllers\Controller;
use App\Models\Colis;
use App\Models\Enums\AccountTypeEnum;
use App\Models\Enums\ColisStatusEnum;
use App\Models\User;
use Illuminate\Http\Request;
use stdClass;

class HomeController extends Controller
{
    public function index()
    {
        $result = new stdClass;
        $result->total_user = User::count();

        $result->total_agent = User::whereHas('account', function ($query) {
            $query->where('code', AccountTypeEnum::AGENT->value);
        })->count();

        $result->total_client = User::whereHas('account', function ($query) {
            $query->where('code', AccountTypeEnum::CLIENT->value);
        })->count();

        $result->total_colis = Colis::count();
        $result->total_unpaid_colis = Colis::where('statut', ColisStatusEnum::UNPAID->value)->count();

        $result->last_colis = Colis::latest()->limit(5)->get();

        return response()->json($result);
    }
}
