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
        Schema::create('experiencias', function (Blueprint $table) {
            $table->id();
            $table
                ->foreignId("candidato_id")
                ->references("id")
                ->on("candidatos")
                ->onDelete("cascade")
                ->onUpdate("cascade");
            $table->string("nome_empresa", 60);
            $table->date("inicio");
            $table->date("fim")->nullable();
            $table->string("cargo");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('experiencias');
    }
};
