<?php

namespace App\Http\Controllers;

use App\Models\Candidato;
use App\Models\Empresa;
use App\Models\User;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $rules = [
            "email" => "required|email",
            "password" => "required|min:8"
        ];

        $feedback = [
            "required" => "O campo :attribute é obrigatório",
            "email.email" => "Email inválido",
            "password.min" => "Senha deve ter no minimo 8 caracteres"
        ];

        $request->validate($rules, $feedback);

        $credentials = $request->all(["email", "password"]);
        if (!$token = auth("api")->attempt($credentials)) {
            return response()->json(["errors" => "Login e/ou senha invalido"], 401);
        }

        return response()->json(["token" => $token]);
    }

    public function me()
    {
        $me = auth("api")->user();
        $user = null;
        if ($me->role === "Empresa") {
            $user = Empresa::find($me->id);

            return [
                "id" => $me->id,
                "email" => $me->email,
                "role" => $me->role,
                "name" => $user->name,
                "ramo" => $user->ramo,
                "descricao" => $user->descricao
            ];
        } else {
            $user = Candidato::find($me->id);
            return [
                "id" => $me->id,
                "email" => $me->email,
                "role" => $me->role,
                "name" => $user->name
            ];
        }
    }

    public function logout()
    {
        $me = auth("api")->logout(true);

        return ["msg" => "Logout realizado"];
    }
}
