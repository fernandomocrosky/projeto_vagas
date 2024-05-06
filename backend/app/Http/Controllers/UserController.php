<?php

namespace App\Http\Controllers;

use App\Models\Candidato;
use App\Models\Empresa;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function editar(Request $request)
    {
        $requestData = $request->all();
        $user = auth("api")->user();
        if ($user->tipo === "Empresa") {
            $user = User::with("empresa")->find($user->id);
            $empresa = Empresa::find($user->id);
            foreach ($requestData as $key => $value) {
                if (key_exists($key, $empresa->toArray())) {
                    $empresa[$key] = $requestData[$key];
                }
            }

            if ($requestData["email"]) {
                $user->email = $requestData["email"];
                $user->save();
            }

            $empresa->save();
            return $user->with("empresa")->get();
        }

        $user = User::with("empresa")->find($user->id);
        $candidato = Candidato::find($user->id);
        foreach ($requestData as $key => $value) {
            if (key_exists($key, $candidato->toArray())) {
                $candidato[$key] = $requestData[$key];
            }
        }

        if ($requestData["email"]) {
            $user->email = $requestData["email"];
            $user->save();
        }

        $candidato->save();

        return $user->with("candidato")->get();
    }

    public function delete()
    {
        $user = auth("api")->user();
        if ($user->tipo === "Empresa") {
            $user = User::with(["empresa" => function ($query) {
                $query->delete();
            }])->find($user->id);
            $user->delete();
            return ["msg" => "Deletado com sucesso"];
        }
        $user = User::with(["candidato" => function ($query) {
            $query->delete();
        }])->find($user->id);
        $user->delete();
        return ["msg" => "Deletado com sucesso"];
    }
}
