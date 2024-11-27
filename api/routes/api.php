<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Others\AccountTypeController;
use App\Http\Controllers\Others\ColisController;
use App\Http\Controllers\Others\IncidentsController;
use App\Http\Controllers\Others\TarifsController;
use App\Http\Controllers\Others\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {

    Route::prefix('account-type')->group(function () {
        Route::get('/', [AccountTypeController::class, 'index']);
    });

    Route::prefix('incidents')->group(function () {
        Route::get('/', [IncidentsController::class, 'index']);
        Route::post('/', [IncidentsController::class, 'store']);
        Route::post('/{incident}', [IncidentsController::class, 'resolve']);
        Route::put('/{incident}', [IncidentsController::class, 'update']);
        Route::delete('/{incident}', [IncidentsController::class, 'destroy']);
    });

    Route::prefix('tarif')->group(function () {
        Route::get('/', [TarifsController::class, 'index']);
        Route::post('/', [TarifsController::class, 'store']);
        Route::put('/{tarif}', [TarifsController::class, 'update']);
        Route::delete('/{tarif}', [TarifsController::class, 'destroy']);
    });

    Route::prefix('user')->group(function () {
        Route::get('/', [UserController::class, 'index']);
        Route::post('/', [UserController::class, 'store']);
        Route::put('/{agent}', [UserController::class, 'update']);
        Route::delete('/{agent}', [UserController::class, 'destroy']);
    });

    Route::prefix('colis')->group(function () {
        Route::get('/', [ColisController::class, 'index']);
        Route::get('/tracking', [ColisController::class, 'tracer']);
        Route::get('/withdrawal', [ColisController::class, 'withdrawal']);
        Route::post('/', [ColisController::class, 'store']);
        Route::post('/send', [ColisController::class, 'send']);
        Route::delete('/remove/{colis}', [ColisController::class, 'remove']);
        Route::put('/{colis}', [ColisController::class, 'update']);
        Route::delete('/{colis}', [ColisController::class, 'destroy']);
    });
});
