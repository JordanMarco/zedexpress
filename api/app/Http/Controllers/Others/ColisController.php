<?php

namespace App\Http\Controllers\Others;

use App\Http\Controllers\Controller;
use App\Mail\Mailing;
use App\Models\Colis;
use App\Models\Enums\AccountTypeEnum;
use App\Models\Enums\ColisStatusEnum;
use App\Models\Enums\EmailTemplateEnum;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;

class ColisController extends Controller
{
    public function index(Request $request)
    {
        if (auth()->user()->account->code !== AccountTypeEnum::ADMIN->value) {
            $colis = Colis::where("who", auth()->id())->get();
        } else {
            $colis = Colis::all();
        }

        return response()->json($colis);
    }

    public function tracer()
    {
        $colis = Colis::where("user_id", auth()->id())
            ->orWhere("receiver_id", auth()->id())
            ->get();

        return response()->json($colis);
    }

    public function withdrawal()
    {
        if (!Gate::allows('has_account_type', [AccountTypeEnum::ADMIN]) && !Gate::allows('has_account_type', [AccountTypeEnum::AGENT])) {
            abort(401);
        }

        $colis = Colis::where("country", auth()->user()->account->country)
            ->where('status', ColisStatusEnum::SEND->value)
            ->get();

        return response()->json($colis);
    }

    public function remove(Colis $colis)
    {
        if (!Gate::allows('has_account_type', [AccountTypeEnum::ADMIN]) && !Gate::allows('has_account_type', [AccountTypeEnum::AGENT, $colis->country])) {
            abort(401);
        }

        if ($colis->statut !== ColisStatusEnum::SEND->value) {
            return response()->json(['translate' => 'errors.action-not-permitted'], 400);
        }

        $colis->hours = Carbon::now()->format('d/m/y - H:i:s');
        $colis->statut = ColisStatusEnum::REMOVED->value;
        // Ajouter la date de retrait
        $colis->save();

        $details = [
            'title' => 'Votre colis a été livré avec succès',
            'body' => 'Nous somme ravi d avoir traité avec vous, nous espérons vous revoir bientot',
            'colis1' => $colis->user->first_name,
            'colis2' => $colis->user->last_name,
        ];

        Mail::to($colis->user->email)->send(new Mailing(EmailTemplateEnum::WITHDRAWAL, "retrait du colis", ['details' => $details]));

        return response()->json($colis);
    }

    public function store(Request $request)
    {
        if (!Gate::allows('has_account_type', [AccountTypeEnum::ADMIN]) && !Gate::allows('has_account_type', [AccountTypeEnum::AGENT])) {
            abort(401);
        }

        $validator = Validator::make($request->all(), [
            "user_id" => "required|exists:users,id",
            "receiver_id" => "required|exists:users,id",
        ]);

        if ($validator->fails()) {
            return response()->json(['translate' => 'errors.validate', 'message' => $validator->messages()], 400);
        }

        $colis = new Colis();

        $colis->fill($request->all());
        $colis->country = auth()->user()->country;
        $colis->date_entree = Carbon::now();
        $colis->hour = "";
        $colis->longueur = $request->longueur;
        $colis->hauteur = $request->hauteur;
        $colis->poids = $request->poids;
        $colis->largeur = $request->largeur;
        $colis->date_depart = $request->date_depart;
        $colis->who = auth()->user()->id;

        $colis->valeur_euro = (($colis->longueur * $colis->hauteur * $colis->largeur) / 5000) * 30;

        $colis->save();

        return response()->json($colis);
    }

    public function send(Colis $colis)
    {
        if (!Gate::allows('has_account_type', [AccountTypeEnum::ADMIN]) && !Gate::allows('has_account_type', [AccountTypeEnum::AGENT])) {
            abort(401);
        }

        if ($colis->statut === ColisStatusEnum::UNPAID->value) {
            return response()->json(['translate' => "errors.unpaid-colis"], 400);
        }

        if ($colis->statut !== ColisStatusEnum::WAITING->value) {
            abort(401);
        }

        $colis->statut = ColisStatusEnum::SEND->value;

        $details = [
            'title' => 'Votre colis est en cours de traitement',
            'body' => 'Nous somme ravi d avoir traité avec vous, nous espérons vous revoir bientot',
            'colis1' => $colis->receiver->first_name,
            'colis2' => $colis->receiver->last_name,
            'colis5' => $colis->user->address,
            'colis6' => $colis->user->country,
            'colis3' => $colis->nom,
            'colis4' => $colis->contenance,
            'colis9' => $colis->date_arrivee,
        ];

        Mail::to($colis->receiver->email)->send(new Mailing(EmailTemplateEnum::DEPOSITE, "Envoie de votre colis", ['details' => $details]));
        $colis->hours = Carbon::now()->format('d/m/y - H:i:s');
        $colis->save();

        return response()->json($colis);
    }

    public function update(Request $request, Colis $colis)
    {
        if (!Gate::allows('has_account_type', [AccountTypeEnum::ADMIN]) && !Gate::allows('has_account_type', [AccountTypeEnum::AGENT, $colis->sender->country])) {
            abort(401);
        }

        if ($colis->statut != ColisStatusEnum::UNPAID->value && $colis->statut != ColisStatusEnum::WAITING->value) {
            abort(400);
        }

        $validator = Validator::make($request->all(), [
            "user_id" => "required",
            "receiver_id" => "required",
        ]);

        if ($validator->fails()) {
            return response()->json(['translate' => 'errors.validate', 'message' => $validator->messages()], 400);
        }

        $colis->fill($request->all());
        $colis->user_id = $request->user_id;
        $colis->receiver_id = $request->receiver_id;

        $colis->save();
        return response()->json($colis);
    }

    public function destroy(Colis $colis)
    {
        if (
            !Gate::allows('has_account_type', [AccountTypeEnum::ADMIN]) &&
            !Gate::allows('has_account_type', [AccountTypeEnum::AGENT, $colis->sender->country]) &&
            !Gate::allows('has_account_type', [AccountTypeEnum::AGENT, $colis->country])
        ) {
            abort(401);
        }

        $colis->delete();

        return response()->noContent();
    }

    public function listAllColis()
    {
        if (!Gate::allows('has_account_type', [AccountTypeEnum::ADMIN]) && !Gate::allows('has_account_type', [AccountTypeEnum::AGENT])) {
            abort(401);
        }
        return response()->json(Colis::all());
    }
}
