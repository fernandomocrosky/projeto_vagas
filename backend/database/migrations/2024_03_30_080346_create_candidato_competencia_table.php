<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('candidato_competencia', function (Blueprint $table) {
            $table->primary(["candidato_id", "competencia_id"]);

            $table
                ->foreignId("candidato_id")->references("id")->on("candidatos")
                ->onUpdate("cascade")->onDelete("cascade");

            $table
                ->foreignId("competencia_id")
                ->references("id")
                ->on("competencias")
                ->onDelete("cascade")
                ->onUpdate("cascade");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('candidato_competencia');
    }
};
