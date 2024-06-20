'use client';

import { useEffect, useState } from 'react';
import { getCompetencias } from '../../_api/competencias';
import { Field, Form, Formik } from 'formik';
import { listCandidatos } from '../../_api/candidato';

export default function EmpresaCandidato() {
  const [candidatos, setCandidatos] = useState([]);
  const [competencias, setCompetencias] = useState();
  const initialValues = {
    competencias: [],
  };

  useEffect(() => {
    getCompetencias().then((res) => {
      setCompetencias(res.data);
    });

    listCandidatos(initialValues).then((res) => setCandidatos(res.data));
  }, []);

  const handleSubmit = (values) => {
    values.competencias = values.competencias.filter((competencia) => competencia !== '');
    values.competencias = values.competencias.map((competencia) => JSON.parse(competencia));
    const data = values;

    listCandidatos(data).then((res) => {
      setCandidatos(res.data);
    });
  };

  return (
    <div>
      <h1>Lista de Candidatos</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}>
        <Form>
          <Field
            name="competencias"
            id="competencias"
            as="select"
            multiple>
            <option></option>
            {competencias &&
              competencias.map((competencia) => (
                <option
                  key={competencia.id}
                  value={JSON.stringify({ id: competencia.id })}>
                  {competencia.nome}
                </option>
              ))}
          </Field>
          <button
            type="submit"
            className="btn btn-success">
            Filtrar
          </button>
        </Form>
      </Formik>

      <table className="table">
        <thead style={{ textAlign: 'center' }}>
          <tr>
            <th scope="col">Nome</th>
            <th scope="col">Competencias</th>
          </tr>
        </thead>
        <tbody>
          {candidatos &&
            candidatos.map((candidato) => (
              <tr
                key={candidato.id}
                style={{ textAlign: 'center' }}>
                <td>{candidato.nome}</td>
                <td>
                  {candidato.competencias.map((competencia, idx) => (
                    <span key={idx}>{competencia.nome + ' '}</span>
                  ))}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
