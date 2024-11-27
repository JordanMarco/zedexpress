<?php

namespace App\Http\Controllers\Others;

use App\Http\Controllers\Controller;
use App\Models\Enums\AccountTypeEnum;
use App\Models\Enums\IncidentStatusEnum;
use App\Models\Incident;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class IncidentsController extends Controller
{
    public function index(Request $request)
    {
        $withPaginate = $request->input('with_paginate', true);

        if ($withPaginate) {
            $incidents = Incident::where("message", 1)->paginate(10);
        } else {
            $incidents = Incident::where("message", 1)->get();
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
        if (auth()->user()->accountType->code == AccountTypeEnum::CLIENT->value) {
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