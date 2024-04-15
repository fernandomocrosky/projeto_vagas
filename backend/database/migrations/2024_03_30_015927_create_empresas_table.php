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
        Schema::create('empresas', function (Blueprint $table) {
            $table->string("ramo");
            $table->string("name")->unique();
            $table->string("descricao");
            $table
                ->foreignId("id")
                ->references("id")
                ->on("users")
                ->constrained()
                ->onUpdate("cascade")
                ->onDelete("cascade");

            $table->primary("id");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('empresas');
    }
};
