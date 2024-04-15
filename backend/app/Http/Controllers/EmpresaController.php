<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Empresa;
use App\Models\User;
use App\Models\Vagas;
use Illuminate\Support\Facades\Hash;

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
        $request->validate($this->empresas->rules(), $this->empresas->feedback());

        $requestData = $request->all();
        $user = new User();
        $empresa = new Empresa();
        $user->role = "Empresa";
        $user->email = $requestData["email"];
        $user->password = $requestData["password"];
        $user->save();

        $empresa->name = $requestData["name"];
        $empresa->descricao = $requestData["descricao"];
        $empresa->ramo = $requestData["ramo"];
        $empresa->user()->associate($user);
        $empresa->save();

        return $empresa->with("user")->find($user->id);
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
        $empresa = $this->empresas->with("vagas")->find($id);

        if ($empresa == null) {
            return ["msg" => "Empresa não encontrada"];
        }
        foreach ($requestData as $key => $value) {
            if (key_exists($key, $empresa->toArray())) {
                $empresa[$key] = $requestData[$key];
            }
        }
        $empresa->save();

        return $empresa;
    }

    function delete($id)
    {
        $empresa = $this->empresas->with("vagas")->find($id);

        if ($empresa == null) return ["msg" => "Empresa não encontrada"];

        $empresa = $empresa->delete();
        if ($empresa) return ["msg" => "Deletado com sucesso"];
    }
}
