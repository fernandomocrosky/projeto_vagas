<?php

namespace App\Http\Controllers;

use App\Models\Ramo;
use Illuminate\Http\Request;

class RamoController extends Controller
{
    public function get()
    {
        return Ramo::with("vagas")->get();
    }
}
