<?php

namespace App\Http\Controllers\Others;

use App\Http\Controllers\Controller;
use App\Models\Colis;
use App\Models\Enums\AccountTypeEnum;
use App\Models\Enums\ColisStatusEnum;
use Carbon\Carbon;
use Illuminate\Http\Request;

class ColisController extends Controller
{
    public function index()
    {
        if (auth()->user()->accountType->code != AccountTypeEnum::ADMIN->value) {
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
        $colis = Colis::where("country", "=", auth()->user()->accountType->id)->get();
        return response()->json($colis);
    }

    public function remove(Colis $colis)
    {
        if ($colis->statut == ColisStatusEnum::WAITING->value) {
            return response()->json(['translate' => 'errors.action-not-permitted'], 400);
        }

        $colis->hours = Carbon::today()->format('d/m/y') . " - " . Carbon::now('Europe/Brussels')->format('H:i:s');
        $colis->statut = ColisStatusEnum::REMOVED->value;

        $colis->save();

        // $details = [
        //     'title' => 'Votre colis a été livré avec succès',
        //     'body' => 'Nous somme ravi d avoir traité avec vous, nous espérons vous revoir bientot',
        //     'colis1' => $colis->user->first_name,
        //     'colis2' => $colis->user->last_name,
        // ];
        // Mail::to($colis->user->email)->send(new Colis2Mail($details));

        return response()->json($colis);
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            "user_id" => "required",
            "receiver_id" => "required",
        ]);

        if ($request->user_id == $request->receiver_id) return back()->withErrors([
            "message" => "Le client ne peut s'envoyer de colis à lui même."
        ]);

        $colis = new Colis();
        $colis->country = auth()->user()->country;
        $colis->date_entree = Carbon::today();
        $colis->hour = "";
        $colis->longueur = $request->longueur;
        $colis->hauteur = $request->hauteur;
        $colis->poids = $request->poids;
        $colis->largeur = $request->largeur;
        $colis->date_depart = $request->date_depart;
        $colis->who = auth()->user()->id;

        $colis->fill($request->all());
        $colis->valeur_euro = (($colis->longueur * $colis->hauteur * $colis->largeur) / 5000) * 30;
        $details = [
            'title' => 'Votre colis est en cours de traitement',
            'body' => 'Nous somme ravi d avoir traité avec vous, nous espérons vous revoir bientot',
            'colis' => $colis->date_entree
        ];
        // send store email
        $colis->save();
    }


    public function send($id)
    {
        $colis = Colis::findOrFail($id);
        $colis->statut = "Envoyé";

        $details = [
            'title' => 'Votre colis est en cours de traitement',
            'body' => 'Nous somme ravi d avoir traité avec vous, nous espérons vous revoir bientot',
            'colis1' => $colis->receiver->first_name,
            'colis2' => $colis->receiver->last_name,
            'colis11' => $colis->user->first_name,
            'colis22' => $colis->user->last_name,
            'colis5' => $colis->user->address,
            'colis6' => $colis->user->country,
            'colis3' => $colis->nom,
            'colis4' => $colis->contenance,
            'colis7' => $colis->receiver->login,
            'colis8' => $colis->receiver->password_eph,
            'colis9' => $colis->date_arrivee,
        ];
        // Send email
        if (!isset($colis->receiver->email)) {
            $name = $colis->receiver->first_name;
            return back()->withErrors([
                "message" => "Le destinataire $name n'a pas d'adresse email"
            ]);
        }
        // Mail::to($colis->receiver->email)->send(new ColisMail($details));

        $colis->receiver->password_eph = "";

        $colis->hour = Carbon::now()->format('d/m/y') . " - " . Carbon::now('Europe/Brussels')->format('H:i:s');
        $colis->save();

        return response()->json($colis);
    }

    public function update(Request $request, $id)
    {
        $this->validate($request, [
            "client_id" => "required",
            "receiver_id" => "required",
        ]);

        $colis = Colis::findOrFail($id);
        $colis->country = auth()->user()->country;
        $colis->date_entree = Carbon::today();
        $colis->user_id = $request->client_id;
        $colis->receiver_id = $request->receiver_id;
        $colis->fill($request->all());

        $colis->save();
        return response()->json($colis);
    }

    public function destroy(Colis $colis)
    {
        $colis->delete();

        return response()->noContent();
    }
}
