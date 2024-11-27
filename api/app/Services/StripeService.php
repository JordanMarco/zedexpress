<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Config;

class StripeService
{

    public function __construct()
    {
        \Stripe\Stripe::setApiKey(Config::get('app.stripe_secret'));
    }

    public function createCheckout($payment)
    {
        $user = User::find(Auth::id());
        $stripeSession = \Stripe\Checkout\Session::create(
            array_merge(
                ['customer_email' => $user->email],
                [
                    'payment_method_types' => ['card'],
                    'line_items' => [[
                        'price_data' => [
                            'currency' => 'eur',
                            'product_data' => [
                                'name' => "Payment de colis",
                                'description' => "Payer votre colis pour que ca cela puisse être envoyé"
                            ],
                            'unit_amount' => $payment->amount * 100,
                        ],
                        'quantity' => 1,
                    ]],
                    'allow_promotion_codes' => false,
                    'mode'                  => 'payment',
                    'payment_intent_data' => [
                        "metadata" => [
                            "uuid" => $payment->uuid,
                            "user_id" => $user->id
                        ]
                    ],
                    "metadata" => [],
                    'client_reference_id'   => $user->id,
                    'success_url'           => url("/api/pay/response?id=$payment->uuid&success=1"),
                    'cancel_url'            => url("/api/pay/response?id=$payment->uuid&success=0")
                ]
            )
        );

        return $stripeSession->url;
    }
}
