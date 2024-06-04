<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Empresa;
use App\Models\User;
use App\Models\Vaga;
use Illuminate\Support\Facades\Validator;

class EmpresaController extends Controller
{
    protected $empresas;

    public function __construct(Empresa $empresa)
    {
        $this->empresas = $empresa;
    }

    function list()
    {
        $empresas = $this->empresas->with("vagas")->get()->toArray();

        if ($empresas == null) return ["msg" => "Nenhuma empresa cadastrada"];
        return $empresas;
    }

    function create(Request $request)
    {
        $validator = Validator::make($request->all(), $this->empresas->rules(), $this->empresas->feedback());

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
        $empresa = new Empresa();
        $user->tipo = "Empresa";
        $user->email = $requestData["email"];
        $user->senha = $requestData["senha"];
        $user->save();

        $empresa->nome = $requestData["nome"];
        $empresa->descricao = $requestData["descricao"];
        $empresa->ramo = $requestData["ramo"];
        $empresa->user()->associate($user);
        $empresa->save();

        return response()->json(["mensagem" => "Usuário cadastrado com sucesso"], 201);
    }

    function show($id)
    {
        $empresa = $this->empresas->with("vagas")->find($id);
        if ($empresa == null) return ["msg" => "Nenhum resultado encontrado"];
        return $empresa;
    }

    function update(Request $request, $id)
    {
        $requestData = $request->all();
        $empresa = $this->empresas->with(["vagas", "user"])->find($id);
        $user = User::find($empresa->user->id);

        if ($empresa == null) {
            return ["msg" => "Empresa não encontrada"];
        }

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

        return $empresa;
    }

    function delete($id)
    {
        $empresa = $this->empresas->with(["user" => function ($query) {
            $query->delete();
        }])->find($id);

        if ($empresa == null) return ["msg" => "Empresa não encontrada"];

        $empresa = $empresa->delete();
        if ($empresa) return response()->json(["msg" => "Deletado com sucesso"], 200);
    }
}
