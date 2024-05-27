<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CandidatoCompetencia extends Model
{
    use HasFactory;

    protected $fillable = ["candidato_id", "competencia_id"];
    protected $table = "candidato_competencia";
    public $timestamps = false;

    public function candidatos()
    {
        return $this->belongsToMany(Candidato::class, "candidato_competencia", "competencia_id", "candidato_id");
    }

    public function competencias()
    {
        return $this->belongsToMany(Competencia::class, "candidato_competencia", "candidato_id", "competencia_id");
    }
}
