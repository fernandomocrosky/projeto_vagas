<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vaga extends Model
{
    protected $fillable = ["nome", "divulgavel", "disponivel", "descricao"];
    use HasFactory;


    public function empresa()
    {
        return $this->belongsTo(Empresa::class);
    }

    public function candidatos()
    {
        return $this->belongsToMany(Candidato::class, "candidato_vaga", "vaga_id", "candidato_id");
    }

    public function competencias()
    {
        return $this->belongsToMany(Competencia::class, "competencia_vaga", "vaga_id", "competencia_id");
    }

    public function ramo()
    {
        return $this->belongsTo(Ramo::class, "ramo_id", "id");
    }
}
