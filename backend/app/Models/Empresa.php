<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Empresa extends Model
{
    protected $fillable = ["name", "ramo", "descricao"];
    protected $hidden = ["created_at", "updated_at"];

    public $timestamps = false;
    protected $casts = [
        "password" => "hashed"
    ];

    use HasFactory;


    public function rules()
    {
        return [
            "email" => "required|email|unique:users",
            "password" => "required|min:8|confirmed",
            "name" => "required|min:3",
            "descricao" => "required|min:20",
            "ramo" => "required|min:4"
        ];
    }

    public function feedback()
    {
        return [
            "required" => "O campo :attribute é obrigatório",
            "email.email" => "Email inválido",
            "email.unique" => "Email já existe",
            "name.min" => "O nome precisa ter no minimo 3 caracteres",
            "name.unique" => "Este nome já existe",
            "password.min" => "Senha precisa ter no minimo 8 caracteres",
            "password.confirmed" => "Senhas não batem",
            "descricao.min" => "Descricao precisa ter no minimo 20 caracteres",
            "ramo.min" => "Ramo precisa ter no minimo 4 caracteres"
        ];
    }

    public function vagas()
    {
        return $this->hasMany(Vagas::class, "empresa_id", "id");
    }

    public function user()
    {
        return $this->belongsTo(User::class, "id");
    }
}
