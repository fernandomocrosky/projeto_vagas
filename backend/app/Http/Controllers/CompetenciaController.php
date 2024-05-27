<?php

namespace App\Http\Controllers;

use App\Models\Competencia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CompetenciaController extends Controller
{

    function list()
    {
        $competencias = Competencia::all();

        if ($competencias) return $competencias;

        return response()->json(["msg" => "Nenhuma competencia", 422]);
    }

    function create(Request $request)
    {
        $rules = [
            "nome" => "required|unique:competencias"
        ];

        $feedback = [
            "nome.required" => "O campo nome é obrigatório",
            "nome.unique" => "Competencia já existe",
        ];

        $validator = Validator::make($request->all(), $rules, $feedback);

        if ($validator->fails()) {
            return response()->json($validator->errors()->all(), 422);
        }

        $competencia = Competencia::create([
            "nome" => $request->nome
        ]);

        if (!$competencia) return ["msg" => "Erro"];
        return response()->json($competencia, 201);
    }

    // function show($id)
    // {
    //     $competencia = $this->competencias->find($id);

    //     if ($competencia) return $competencia;

    //     return ["msg" => "Não encontrado"];
    // }

    // function update(Request $request, $id)
    // {
    //     $requestData = $request->all();
    //     $competencia  = $this->competencias->find($id);

    //     if ($competencia) {
    //         foreach ($requestData as $key => $value) {
    //             $competencia[$key] = $requestData[$key];
    //         }

    //         $competencia->save();
    //         return $competencia;
    //     }
    //     return ["msg" => "Não encontrado"];
    // }

    // function delete($id)
    // {
    //     $competencia = Competencia::find($id);

    //     if ($competencia) {
    //         $success = $competencia->delete();
    //         return $success ?
    //             response()->json(["msg" => "deletado com sucesso"], 200)
    //             : response()->json(["msg" => "Erro ao Deletar"], 422);
    //     }
    //     return ["msg" => "delete oh yes"];
    // }
}
