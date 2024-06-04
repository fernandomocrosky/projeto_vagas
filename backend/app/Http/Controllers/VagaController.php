<?php

namespace App\Http\Controllers;

use App\Models\Empresa;
use App\Models\Vaga;
use App\Models\VagaCompetencia;
use Illuminate\Http\Request;

class VagaController extends Controller
{

    function list()
    {
        $vagas = Vaga::with(["competencias", "ramo"])->get();
        if (!$vagas->isEmpty()) {
            return $vagas;
        }
        return ["msg" => "Não existe vagas cadastradas"];
    }

    function create(Request $request)
    {
        $empresa = Empresa::find(auth("api")->user());

        $vaga = new Vaga();
        $vaga->titulo = $request->titulo;
        $vaga->descricao = $request->descricao;
        $vaga->experiencia = $request->experiencia;
        $vaga->salario_min = $request->salario_min;
        $vaga->salario_max = $request->salario_max;
        $vaga->ativo = $request->ativo;
        $vaga->empresa_id = $empresa->id;
        $vaga->ramo_id = $request->ramo_id;
        $vaga->save();

        foreach ($request->competencias as $competencia) {
            $relacao = new VagaCompetencia();
            $relacao->vaga_id = $vaga->id;
            $relacao->competencia_id = $competencia->id;
            $relacao->save();
        }

        return $vaga;
    }

    function show($id)
    {
        $vagas = Vaga::with(["competencias", "ramo"])->get();

        if (!$vagas->isEmpty()) {
            return $vagas;
        }

        return ["msg" => "Não foram encontradas vagas"];
    }

    function update(Request $request, $id)
    {
        $requestData = $request->all();
        $vaga = Vaga::find($id);

        if ($vaga == null) return ["msg" => "Não existe vaga"];
        foreach ($requestData as $key => $value) {
            if (key_exists($key, $vaga->toArray())) {
                $vaga[$key] = $requestData[$key];
            }
        }

        $vaga->save();
        return $vaga;
    }

    function delete($id)
    {
        $vaga = Vaga::find($id);

        if ($vaga == null) return ["msg" => "Não existe vaga"];

        return $vaga->delete();
    }
}
