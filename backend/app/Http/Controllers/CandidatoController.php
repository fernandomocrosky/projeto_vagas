<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Candidato;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

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
        $request->validate($this->candidato->rules(), $this->candidato->feedback());

        $requestData = $request->all();
        $user = new User();
        $user->email = $requestData["email"];
        $user->password = $requestData["password"];
        $user->role = "Candidato";
        $user->save();

        $candidato = new Candidato();
        $candidato->name = $requestData["name"];

        $candidato->user()->associate($user);
        $candidato->save();

        return $candidato->with("user")->find($user->id);
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
                "nome" => $candidato->name,
                "email" => $user->email,
                "competencias" => $candidato->competencias,
                "vagas" => $candidato->vagas,
                "experiencias" => $candidato->experiencias
            ];
        };

        return ["msg" => "Candidato não existe"];
    }

    function update(Request $request, $id)
    {
        $requestData = $request->all();
        $candidato = $this->candidato->find($id);

        foreach ($requestData as $key => $value) {
            if (key_exists($key, $candidato->toArray())) {
                $candidato[$key] = $requestData[$key];
            }

            $candidato->save();

            return $candidato;
        }
    }

    function delete($id)
    {
        $candidato = $this->candidato->find($id);
        if ($candidato != null) {
            $candidato->delete();
            return ["msg" => "deletado com sucesso"];
        }
        return ["msg" => "Candidato não existe"];
    }
}
