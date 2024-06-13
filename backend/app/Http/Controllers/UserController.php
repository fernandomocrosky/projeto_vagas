<?php

namespace App\Http\Controllers;

use App\Models\Candidato;
use App\Models\CandidatoCompetencia;
use App\Models\Competencia;
use App\Models\Empresa;
use App\Models\Experiencia;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function editar(Request $request)
    {
        $requestData = $request->all();
        $user = auth("api")->user();
        if (strtolower($user->tipo) === "empresa") {
            $userToUpdate = User::with("empresa")->find($user->id);
            $empresa = Empresa::find($user->id);
            foreach ($requestData as $key => $value) {
                if (key_exists($key, $empresa->toArray())) {
                    $empresa[$key] = $requestData[$key];
                }
            }

            if ($requestData["email"]) {
                $userToUpdate->email = $requestData["email"];
                $userToUpdate->save();
            }

            $empresa->save();
            return response()->json($userToUpdate->with("empresa")->find($user->id), 200);
        }

        $userToUpdate = User::with("empresa")->find($user->id);
        $candidato = Candidato::find($user->id);
        $candidato->nome = $request->nome;

        if (key_exists("email", $requestData)) {
            $userToUpdate->email = $requestData["email"];
            $userToUpdate->save();
        }

        CandidatoCompetencia::where("candidato_id", $candidato->id)->delete();
        if ($request->competencias) {
            foreach ($request->competencias as $competencia) {
                $competenciaId = $competencia["id"];
                $relacao = new CandidatoCompetencia();
                $relacao->competencia_id = $competenciaId;
                $relacao->candidato_id = $candidato->id;
                $relacao->save();
            }
        }

        Experiencia::where("candidato_id", $candidato->id)->delete();

        if ($request->experiencia) {
            foreach ($request->experiencia as $exp) {
                $alreadyAssoc = $candidato->experiencias()->where([
                    "nome_empresa" => $exp["nome_empresa"],
                    "cargo" => $exp["cargo"],
                    "inicio" => $exp["inicio"],
                    "fim" => key_exists('fim', $exp) ? $exp["fim"] : null,
                ])->get();
                if ($alreadyAssoc->isEmpty()) {
                    $experiencia = new Experiencia();
                    $experiencia->cargo = $exp["cargo"];
                    $experiencia->nome_empresa = $exp["nome_empresa"];
                    $experiencia->inicio = $exp["inicio"];
                    $experiencia->fim = key_exists('fim', $exp) ? $exp["fim"] : null;
                    $experiencia->candidato_id = $candidato->id;

                    $experiencia->save();
                } else {
                    continue;
                }
            }
        }

        $candidato->save();

        return response()->json(["msg" => "Usuário editado com sucesso"], 200);
    }

    public function delete()
    {
        $user = auth("api")->user();
        if (strtolower($user->tipo) === "empresa") {
            $user = User::find($user->id);
            $user->delete();
            return ["msg" => "Deletado com sucesso"];
        }
        $user = User::find($user->id);
        $user->delete();
        return response()->json(["msg" => "Deletado com sucesso"], 200);
    }
}
