<?php

namespace App\Http\Controllers\Others;

use App\Http\Controllers\Controller;
use App\Models\Colis;
use App\Models\Enums\AccountTypeEnum;
use App\Models\Enums\ColisStatusEnum;
use App\Models\User;
use stdClass;

class HomeController extends Controller
{
    public function index()
    {
        $accountCode = auth()->user()->account->code;

        $result = new stdClass;
        $result->total_user = User::count();

        $result->total_agent = User::whereHas('account', function ($query) {
            $query->where('code', AccountTypeEnum::AGENT->value);
        })->count();

        $result->total_client = User::whereHas('account', function ($query) {
            $query->where('code', AccountTypeEnum::CLIENT->value);
        })->count();

        if ($accountCode === AccountTypeEnum::CLIENT->value) {
            $result->total_colis = Colis::where(function ($query) {
                $query->where("user_id", auth()->id())
                ->orWhere("receiver_id", auth()->id());
            })->count();

            $result->total_unpaid_colis = Colis::where(function ($query) {
                $query->where("user_id", auth()->id())
                ->orWhere("receiver_id", auth()->id());
            })->where('statut', ColisStatusEnum::UNPAID->value)->count();

            $result->last_colis = Colis::where("user_id", auth()->id())
                ->orWhere("receiver_id", auth()->id())
                ->latest()
                ->limit(5)
                ->get();
        } else {
            $result->total_colis = Colis::count();
            $result->total_unpaid_colis = Colis::where('statut', ColisStatusEnum::UNPAID->value)->count();

            $result->last_colis = Colis::latest()->limit(5)->get();
        }

        return response()->json($result);
    }
}
