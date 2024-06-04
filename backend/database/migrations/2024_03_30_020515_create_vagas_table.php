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
        Schema::create('vagas', function (Blueprint $table) {
            $table->id();
            $table->string("titulo");
            $table->string("descricao");
            $table->smallInteger("experiencia");
            $table->float("salario_min", 2);
            $table->float("salario_max", 2);
            $table->boolean("ativo")->default(true);
            $table->timestamps();

            $table
                ->foreignId("empresa_id")
                ->references("id")
                ->on("empresas")
                ->onUpdate("CASCADE")
                ->onDelete("CASCADE");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vagas');
    }
};
