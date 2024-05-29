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
}
