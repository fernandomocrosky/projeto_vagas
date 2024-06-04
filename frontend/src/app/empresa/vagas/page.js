'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { getVagas } from '../../_api/vagas';

export default function EmpresaVagas() {
  const [vagas, setVagas] = React.useState([]);
  const router = useRouter();

  React.useEffect(() => {
    getVagas().then((vagas) => {
      setVagas(vagas);
    });
  }, []);

  return (
    <div className="container">
      <h2>Vagas</h2>
      {!vagas.length > 0 ? (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Titulo</th>
              <th scope="col">Descrição</th>
              <th scope="col">Salário Minimi</th>
              <th scope="col">Salário Máximo</th>
              <th scope="col">Editar</th>
              <th scope="col">Deletar</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Teste</td>
              <td>Teste</td>
              <td>Teste</td>
              <td>Teste</td>
              <td>
                <button>Editar</button>
              </td>
              <td>
                <button>Deletar</button>
              </td>
            </tr>
          </tbody>
        </table>
      ) : (
        <h3 className="mt-5">Nenhuma Vaga Cadastrada</h3>
      )}
      <button
        className="btn btn-success"
        onClick={() => router.push('/empresa/vagas/cadastrar')}>
        Cadastrar Vaga
      </button>
      <button
        className="btn btn-danger"
        onClick={() => router.back()}>
        Voltar
      </button>
    </div>
  );
}
