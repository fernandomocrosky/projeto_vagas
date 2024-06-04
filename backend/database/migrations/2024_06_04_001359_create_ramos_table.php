<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('ramos', function (Blueprint $table) {
            $table->id();
            $table->string("nome");
            $table->string("descricao");
            $table->timestamps();
        });

        DB::statement("
            INSERT INTO ramos
                (nome, descricao)
            VALUES
                ('Desenvolvimento de Software', 'Responsável por projetar, desenvolver e manter aplicativos de software.'),
                ('Administração de Redes', 'Responsável por gerenciar e manter redes de computadores dentro de uma organização.'),
                ('Segurança Cibernética', 'Responsável por proteger sistemas de computadores, redes e dados contra ameaças cibernéticas.'),
                ('Administração de Banco de Dados', 'Responsável por gerenciar e manter bancos de dados dentro de uma organização.')
            ;
        ");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ramos');
    }
};
