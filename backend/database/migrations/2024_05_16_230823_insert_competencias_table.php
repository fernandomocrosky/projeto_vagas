<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        DB::statement("
            INSERT INTO competencias 
                (nome)
            VALUES
                ('PHP'),
                ('JavaScript'),
                ('Python'),
                ('Java'),
                ('HTML'),
                ('CSS'),
                ('React'),
                ('Node.js'),
                ('SQL'),
                ('Git')
        ");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement("
            DELETE FROM competencias
            WHERE nome IN (
                'PHP', 
                'JavaScript', 
                'Python', 
                'Java', 
                'HTML', 
                'CSS', 
                'React',
                'Node.js', 
                'SQL', 
                'Git'
            )
        ");
    }
};
