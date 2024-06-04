<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ramo extends Model
{
    protected $fillable = ["nome", "descricao"];
    use HasFactory;


    public function vagas()
    {
        return $this->hasMany(Vaga::class, "ramo_id", "id");
    }
}
