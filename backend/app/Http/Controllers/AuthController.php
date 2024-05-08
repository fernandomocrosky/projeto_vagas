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
        $requestData = $request->all(["email", "senha"]);
        $rules = [
            "email" => "required|email",
            "senha" => "required|min:8"
        ];

        $feedback = [
            "required" => "O campo :attribute é obrigatório",
            "email.email" => "Email inválido",
            "senha.min" => "Senha deve ter no minimo 8 caracteres"
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

        $credentials = $request->all(["email", "senha"]);
        $credentials["password"] = $requestData["senha"];
        unset($credentials["senha"]);
        if (!$token = auth("api")->attempt($credentials)) {
            return response()->json(["errors" => ["Login e/ou senha invalido"]], 422);
        }

        return response()->json(["token" => $token], 200);
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

            return response()->json([
                "id" => $me->id,
                "email" => $me->email,
                "tipo" => $me->tipo,
                "nome" => $user->nome,
                "ramo" => $user->ramo,
                "descricao" => $user->descricao
            ], 200);
        } else {
            $user = Candidato::find($me->id);
            return response()->json([
                "id" => $me->id,
                "email" => $me->email,
                "tipo" => $me->tipo,
                "nome" => $user->nome
            ], 200);
        }
    }

    public function logout()
    {
        $me = auth("api")->logout(true);

        return response()->json(["mensagem" => "Sucesso"], 200);
    }
}
