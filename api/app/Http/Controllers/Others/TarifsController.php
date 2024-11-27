<?php

namespace App\Http\Controllers\Others;

use App\Http\Controllers\Controller;
use App\Models\Tarif;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TarifsController extends Controller
{
    public function index(Request $request)
    {
        $withPaginate = $request->input('with_paginate', true);

        if ($withPaginate) {
            $tarifs = Tarif::paginate(10);
        } else {
            $tarifs = Tarif::all();
        }

        return response()->json($tarifs);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'libelle' => 'required|string',
            'montant' => 'required|numeric|min:0'
        ]);

        if ($validator->fails()) {
            return response()->json(['translate' => 'errors.validate'], 400);
        }

        $tarif = new Tarif();
        $tarif->libelle = $request->libelle;
        $tarif->montant = $request->montant;
        $tarif->save();

        return response()->json($tarif);
    }

    public function update(Request $request, Tarif $tarif)
    {
        $validator = Validator::make($request->all(), [
            'libelle' => 'required|string',
            'montant' => 'required|numeric|min:0'
        ]);

        if ($validator->fails()) {
            return response()->json(['translate' => 'errors.validate'], 400);
        }

        $tarif->libelle = $request->libelle;
        $tarif->montant = $request->montant;
        $tarif->save();

        return response()->json($tarif);
    }

    public function destroy(Tarif $tarif)
    {
        $tarif->delete();
        return response()->noContent();
    }
}