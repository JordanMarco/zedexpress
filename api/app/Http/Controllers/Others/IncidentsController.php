<?php

namespace App\Http\Controllers\Others;

use App\Http\Controllers\Controller;
use App\Models\Enums\AccountTypeEnum;
use App\Models\Enums\IncidentStatusEnum;
use App\Models\Incident;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Validator;

class IncidentsController extends Controller
{
    public function __construct()
    {
        $this->authorizeResource(Incident::class, 'incident');
    }


    public function index(Request $request)
    {
        $withPaginate = $request->input('with_paginate', true);
        $search = '%' . $request->input('search', '') . '%';
        $perPage = $request->input('per_page', 10);
        $message = $request->input('message', 1);
        $query = Incident::where('titre', 'LIKE', $search);

        if(Gate::allows('has_account_type', [AccountTypeEnum::CLIENT])){
            $message = 0;
            $query->where('user_id', auth()->id());
        }

        if ($withPaginate != 'false') {
            $incidents = $query->where("message", $message)->paginate($perPage);
        } else {
            $incidents = $query->where("message", $message)->get();
        }

        return response()->json($incidents);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'motif' => 'required',
            'titre' => 'required',
            'colis_id' => 'required|exists:colis,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['translate' => 'errors.validate'], 400);
        }

        $incident = new Incident();
        $incident->motif = $request->motif;
        $incident->colis_id = $request->colis_id;
        $incident->titre = $request->titre;
        $incident->user_id = auth()->id();
        $incident->statut = IncidentStatusEnum::WAITING->value;
        if (auth()->user()->account->code == AccountTypeEnum::CLIENT->value) {
            $incident->message = 0;
        } else {
            $incident->message = 1;
        }

        $incident->save();

        return response()->json($incident);
    }

    public function update(Request $request, Incident $incident)
    {
        $validator = Validator::make($request->all(), [
            'motif' => 'required|string',
            'titre' => 'required|string',
            'colis_id' => 'required|exists:colis,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['translate' => 'errors.validate'], 400);
        }

        $incident->motif = $request->motif;
        $incident->colis_id = $request->colis_id;
        $incident->titre = $request->titre;

        $incident->save();

        return response()->json($incident);
    }

    public function resolve(Incident $incident)
    {
        $incident->statut = IncidentStatusEnum::SOLVE->value;
        $incident->save();
        return response()->json($incident);
    }

    public function destroy(Incident $incident)
    {
        $incident->delete();

        return response()->noContent();
    }
}
