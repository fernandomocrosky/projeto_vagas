<?php

namespace App\Http\Controllers;

use App\Models\Candidato;
use App\Models\Empresa;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $requestData = $request->all(["email", "password"]);
        $rules = [
            "email" => "required|email",
            "password" => "required|min:8"
        ];

        $feedback = [
            "required" => "O campo :attribute é obrigatório",
            "email.email" => "Email inválido",
            "password.min" => "Senha deve ter no minimo 8 caracteres"
        ];

        $validator = Validator::make($requestData, $rules, $feedback);

        if ($validator->fails()) {
            $errors = $validator->errors()->toArray();
            $errorData = [];
            foreach ($errors as $key => $value) {
                foreach ($value as $error) {
                    $errorData[] = $error;
                }
            }
            return response()->json(["errors" => $errorData], 422);
        }

        $credentials = $request->all(["email", "password"]);
        if (!$token = auth("api")->attempt($credentials)) {
            return response()->json(["errors" => ["Login e/ou senha invalido"]], 422);
        }

        return response()->json(["token" => $token]);
    }

    public function get()
    {

        $users = User::join("empresas", "users.id", "=", "empresas.id")
            ->join("candidatos", "users.id", "=", "candidatos.id")
            ->orderBy("empresas.name")
            ->distinct()->get();

        return $users;
    }

    public function me()
    {
        $me = auth("api")->user();
        $user = null;
        if ($me->tipo === "Empresa") {
            $user = Empresa::find($me->id);

            return [
                "id" => $me->id,
                "email" => $me->email,
                "tipo" => $me->tipo,
                "nome" => $user->nome,
                "ramo" => $user->ramo,
                "descricao" => $user->descricao
            ];
        } else {
            $user = Candidato::find($me->id);
            return [
                "id" => $me->id,
                "email" => $me->email,
                "tipo" => $me->tipo,
                "nome" => $user->nome
            ];
        }
    }

    public function logout()
    {
        $me = auth("api")->logout(true);

        return ["msg" => "Logout realizado"];
    }
}
