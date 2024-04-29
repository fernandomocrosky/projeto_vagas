<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Candidato extends Model
{
    protected $fillable = ["nome"];
    protected $hidden = ["password"];
    public $timestamps = false;


    protected $casts = [
        "password" => "hashed"
    ];

    public function rules()
    {
        return [
            "email" => "required|email|unique:users",
            "password" => "required|min:8",
            "nome" => "required|min:3"
        ];
    }

    public function feedback()
    {
        return [
            "required" => "O :attribute é obrigatório",
            "email.email" => "Email invalido",
            "email.unique" => "Email já existe",
            "nome.min" => "O nome deve ter no minimo 3 caracteres",
            "password.min" => "A senha deve ter no minimo 8 caracteres",
        ];
    }

    use HasFactory;

    public function experiencias()
    {
        return $this->hasMany(Experiencia::class, "candidato_id", "id");
    }

    public function competencias()
    {
        return $this->belongsToMany(Competencia::class, "candidato_competencia", "candidato_id", "competencia_id", "id");
    }

    public function vagas()
    {
        return $this->belongsToMany(Vagas::class, "candidato_vaga", "candidato_id", "vaga_id", "id");
    }

    public function user()
    {
        return $this->belongsTo(User::class, "id");
    }
}
