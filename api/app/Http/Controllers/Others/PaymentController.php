<?php

namespace App\Http\Controllers\Others;

use App\Http\Controllers\Controller;
use App\Models\Colis;
use App\Models\Enums\ColisStatusEnum;
use App\Models\Enums\PaymentStatusEnum;
use App\Models\Payment;
use App\Services\StripeService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PaymentController extends Controller
{
    public function pay(Colis $colis)
    {
        $payment = new Payment();
        $payment->user_id = Auth::id();
        $payment->coli_id = $colis->id;
        $payment->amount = $colis->tarif->montant;
        $payment->save();
        $payment->fresh();
        $service = new StripeService();
        $url_checkout = $service->createCheckout($payment);

        return response()->json(['payment' => $payment, 'url' => $url_checkout]);
    }

    public function response(Request $request)
    {
        $uuid = $request->get('id', null);
        $payment = Payment::where('uuid', $uuid)->first();
        $success = $request->get('success', 0);
        settype($success, 'integer');
        if ($success === 1) {
            $payment->status = PaymentStatusEnum::PAYED->value;
            $payment->save();
            $payment->colis->update(['status' => ColisStatusEnum::WAITING->value]);
        } else {
            $payment->status = PaymentStatusEnum::CANCELLED->value;
            $payment->save();
        }


        return response()->noContent();
    }

    public function getPayment(Payment $payment)
    {
        return response()->json($payment);
    }
}
