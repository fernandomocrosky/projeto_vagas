<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CandidatoController;
use App\Http\Controllers\CompetenciaController;
use App\Http\Controllers\EmpresaController;
use App\Http\Controllers\ExperienciaController;
use App\Http\Controllers\RamoController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\VagaController;


Route::post("/login", [AuthController::class, "login"]);
Route::get("/", [AuthController::class, "get"]);
Route::post("/logout", [AuthController::class, "logout"])->middleware("jwt.auth");
Route::get("/usuario", [AuthController::class, "me"])->middleware("jwt.auth");

Route::prefix("/usuario")->middleware("jwt.auth")->group(function () {
  Route::put("/", [UserController::class, "editar"]);
  Route::delete("/", [UserController::class, "delete"]);
});

Route::prefix("/usuarios")->group(function () {

  Route::prefix("/candidatos")->controller(CandidatoController::class)->group(function () {
    Route::post("/", "create");
    Route::get("/{id}", "show")->middleware("jwt.auth");
    Route::post("/buscar", "listCandidatos")->middleware("jwt.auth");
  });

  Route::prefix("/empresa")->controller(EmpresaController::class)->group(function () {
    Route::get("/", "list");
    Route::post("/", "create");

    Route::get("/{id}", "show");
  });
});


Route::prefix("/vagas")->middleware("jwt.auth")->controller(VagaController::class)->group(function () {
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

Route::get("/ramos", [RamoController::class, "get"]);
