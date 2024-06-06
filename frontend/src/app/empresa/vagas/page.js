'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { getVagas, deleteVaga } from '../../_api/vagas';
import Swal from 'sweetalert2';

export default function EmpresaVagas() {
  const [vagas, setVagas] = React.useState([]);
  const router = useRouter();

  React.useEffect(() => {
    getVagas().then((res) => {
      setVagas(res.data);
    });
  }, []);

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Tem certeza?',
      text: 'Você não poderá reverter isso!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, deletar!',
    }).then((res) => {
      if (res.isConfirmed) {
        deleteVaga(id)
          .then(() => {
            setVagas(vagas.filter((vaga) => vaga.id !== id));
          })
          .catch((err) => console.error(err));
        Swal.fire({
          title: 'Sucesso',
          text: 'Vaga deletada',
          icon: 'success',
        });
      }
    });
  };

  return (
    <div className="container">
      <h2>Vagas</h2>
      {vagas.length > 0 ? (
        <table className="table">
          <thead style={{ textAlign: 'center' }}>
            <tr>
              <th scope="col">Titulo</th>
              <th scope="col">Descrição</th>
              <th scope="col">Salário Minimo</th>
              <th scope="col">Salário Máximo</th>
              <th scope="col">Editar</th>
              <th scope="col">Deletar</th>
            </tr>
          </thead>
          <tbody>
            {vagas.map((vaga) => (
              <tr
                key={vaga.id}
                style={{ textAlign: 'center' }}>
                <td>{vaga.titulo}</td>
                <td>{vaga.descricao.slice(0, 20)}</td>
                <td>{vaga.salario_min ? vaga.salario_min : '0'}</td>
                <td>{vaga.salario_max ? vaga.salario_max : '0'}</td>
                <td>
                  <button
                    className="btn btn-sm btn-success"
                    onClick={() => router.push(`/empresa/vagas/${vaga.id}/editar`)}>
                    Editar
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(vaga.id)}>
                    Deletar
                  </button>
                </td>
              </tr>
            ))}
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
        onClick={() => router.push('/empresa')}>
        Voltar
      </button>
    </div>
  );
}
