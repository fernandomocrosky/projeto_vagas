<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Competencia extends Model
{
    protected $fillable = ["nome"];
    protected $hidden = ["created_at", "updated_at"];
    use HasFactory;

    public function candidatos()
    {
        return $this->belongsToMany(Candidato::class, "candidato_competencia", "competencia_id", "user_id");
    }
}
