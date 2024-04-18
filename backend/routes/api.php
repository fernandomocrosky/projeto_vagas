<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CandidatoController;
use App\Http\Controllers\CompetenciaController;
use App\Http\Controllers\EmpresaController;
use App\Http\Controllers\ExperienciaController;
use App\Http\Controllers\VagasController;

Route::post("/login", [AuthController::class, "login"]);
Route::get("/", [AuthController::class, "get"]);
Route::get("/logout", [AuthController::class, "logout"])->middleware("jwt.auth");
Route::get("/me", [AuthController::class, "me"])->middleware("jwt.auth");

Route::prefix("/usuarios")->group(function () {
  Route::prefix("/candidatos")->controller(CandidatoController::class)->group(function () {
    Route::post("/", "create");
    Route::get("/{id}", "show")->middleware("jwt.auth");
  });

  Route::prefix("/empresas")->controller(EmpresaController::class)->group(function () {
    Route::post("/", "create");
  });
});


Route::prefix("/vagas")->controller(VagasController::class)->group(function () {
  Route::get("/", "list");
  Route::post("/", "create");

  Route::get("/{id}", "show");
  Route::put("/{id}", "update");
  Route::delete("/{id}", "delete");
});

Route::prefix("/empresas")->controller(EmpresaController::class)->group(function () {
  Route::get("/", "list");
  Route::post("/", "create");

  Route::get("/{id}", "show");
  Route::put("/{id}", "update");
  Route::delete("/{id}", "delete");
});


Route::prefix("/experiencias")->controller(ExperienciaController::class)->group(function () {
  Route::get("/", "list");
  Route::post("/", "create");

  Route::get("/{id}", "show");
  Route::put("/{id}", "update");
  Route::delete("/{id}", "delete");
});

Route::prefix("/competencias")->controller(CompetenciaController::class)->group(function () {
  Route::get("/", "list");
  Route::post("/", "create");

  Route::get("/{id}", "show");
  Route::put("/{id}", "update");
  Route::delete("/{id}", "delete");
});
