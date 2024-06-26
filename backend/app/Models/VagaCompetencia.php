<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VagaCompetencia extends Model
{
    protected $fillable = ["vaga_id", "competencia_id"];
    protected $table = "competencia_vaga";

    public $timestamps = false;
    use HasFactory;
}
