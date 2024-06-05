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
        $user = auth("api")->user();

        if (strtolower($user->tipo) === "empresa") {
            $vagas = Vaga::with(["competencias", "ramo"])
                ->where("empresa_id", $user->id)->get();

            return $vagas;
        }

        $vagas = Vaga::with(["competencias", "ramo"])->get();
        if (!$vagas->isEmpty()) {
            return response()->json($vagas, 200);
        }
        return response()->json(["mensagem" => "Não existe vagas cadastradas"], 204);
    }

    function create(Request $request)
    {
        $empresa = Empresa::find(auth("api")->user()->id);

        $vaga = new Vaga();
        $vaga->titulo = $request->titulo;
        $vaga->descricao = $request->descricao;
        $vaga->experiencia = $request->experiencia;
        $vaga->salario_min = $request->salario_min;
        if ($request->salario_max) {
            $vaga->salario_max = $request->salario_max;
        }
        $vaga->ativo = $request->ativo;
        $vaga->empresa_id = $empresa->id;
        $vaga->ramo_id = $request->ramo_id;
        $vaga->save();

        foreach ($request->competencias as $competencia) {
            $relacao = new VagaCompetencia();
            $relacao->vaga_id = $vaga->id;
            $relacao->competencia_id = $competencia["id"];
            $relacao->save();
        }

        return response()->json(["mensagem" => "criado com sucesso", 201]);
    }

    function show($id)
    {
        $vaga = Vaga::with(["competencias", "ramo"])->where("id", $id)->firstOrFail();

        if ($vaga) {
            return response()->json($vaga, 200);
        }

        return response()->json(["mensagem" => "Nada encontrado"], 204);
    }

    function update(Request $request, $id)
    {
        $vaga = Vaga::find($id);
        $vaga->titulo = $request->titulo;
        $vaga->descricao = $request->descricao;
        $vaga->experiencia = $request->experiencia;
        $vaga->salario_min = $request->salario_min;
        if ($request->salario_max) {
            $vaga->salario_max = $request->salario_max;
        }
        $vaga->ativo = $request->ativo;
        $vaga->ramo_id = $request->ramo_id;
        $vaga->save();

        VagaCompetencia::where("vaga_id", $id)->delete();

        foreach ($request->competencias as $competencia) {
            $relacao = new VagaCompetencia();
            $relacao->vaga_id = $vaga->id;
            $relacao->competencia_id = $competencia["id"];
            $relacao->save();
        }

        return response()->json(["mensagem" => "Alterado com sucesso"], 200);
    }

    function delete($id)
    {
        $vaga = Vaga::find($id);

        if ($vaga == null) response()->json(["mensagem" => "Nada encontrado"], 204);
        if ($vaga->delete()) {
            return response()->json(["mensagem" => "Deletado com sucesso", 204]);
        }

        return response()->json(["erro" => "Ocorreu um erro"], 400);
    }
}
