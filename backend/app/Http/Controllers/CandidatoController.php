<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Candidato;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class CandidatoController extends Controller
{
    private $candidato;
    private $user;

    public function __construct(Candidato $candidato, User $user)
    {
        $this->candidato = $candidato;
        $this->user = $user;
    }

    function list()
    {
        $candidatos = $this->candidato
            ->with("experiencias")
            ->with("competencias")
            ->with("vagas")
            ->get();
        if ($candidatos->toArray() == null) return ["msg" => "Não encontrado"];
        return $candidatos;
    }

    function create(Request $request)
    {
        $validator = Validator::make($request->all(), $this->candidato->rules(), $this->candidato->feedback());

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

        $requestData = $request->all();
        $user = new User();
        $user->email = $requestData["email"];
        $user->senha = $requestData["senha"];
        $user->tipo = "candidato";
        $user->save();

        $candidato = new Candidato();
        $candidato->nome = $requestData["nome"];
        $candidato->user()->associate($user);
        $candidato->save();

        return response()->json($candidato->with("user")->find($user->id), 201);
    }

    function show($id)
    {
        $candidato = $this->candidato
            ->with("experiencias")
            ->with("vagas")
            ->with("competencias")
            ->find($id);

        if ($candidato != null) {
            $user = $this->user->find($id);

            return [
                "nome" => $candidato->nome,
                "email" => $user->email,
                "competencias" => $candidato->competencias,
                "vagas" => $candidato->vagas,
                "experiencias" => $candidato->experiencias
            ];
        };

        return response()->json(["errors" => ["Candidato não existe"]], 422);
    }

    function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            "nome" => "required"
        ], $this->candidato->feedback());

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

        $requestData = $request->all();
        $candidato = $this->candidato->with("user")->find($id);
        $user = User::find($candidato->user->id);

        foreach ($requestData as $key => $value) {
            if (key_exists($key, $candidato->toArray())) {
                $candidato[$key] = $requestData[$key];
            }
        }
        $candidato->save();
        if ($requestData['email']) {
            $user->email = $requestData['email'];
            $user->save();
        }

        return $candidato;
    }

    function delete($id)
    {
        $candidato = $this->candidato->with(["user" => function ($query) {
            $query->delete();
        }])->find($id);
        if ($candidato != null) {
            $candidato->delete();
            return ["msg" => "deletado com sucesso"];
        }
        return response()->json(["msg" => "Candidato não existe"], 422);
    }
}
