'use client';
import { Formik, Form, Field, FieldArray } from 'formik';
import { getCompetencias } from '../_api/competencias';
import { getRamos } from '../_api/ramos';
import styles from '../styles/components/LoginForm.module.css';
import React from 'react';
import { useRouter } from 'next/navigation';

function VagasForm({ handleSubmit, initialValues, edit }) {
  const [competencias, setCompetencias] = React.useState([]);
  const [ramos, setRamos] = React.useState([]);
  const router = useRouter();

  React.useEffect(() => {
    getCompetencias()
      .then((res) => {
        setCompetencias(res.data);
      })
      .catch((err) => console.log(err));

    getRamos()
      .then((res) => {
        setRamos(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}>
      {({ values, onChange }) => (
        <Form>
          <div className={styles.formCard}>
            <div className={styles.formFields}>
              <Field
                className="form-control"
                name="titulo"
                id="titulo"
                placeholder="*Titulo"
                type="text"
              />
              <Field
                className="form-control"
                name="descricao"
                id="descricao"
                placeholder="*Descricao"
                as="textarea"
              />
              <Field
                className="form-control"
                name="experiencia"
                id="experiencia"
                placeholder="Experiencia"
                type="text"
                pattern="[0-9]"
              />
              <h6>Ramo da Vaga</h6>
              <Field
                className="form-select mb-3"
                name="ramo_id"
                id="ramo_id"
                placeholder="*Ramos"
                as="select">
                <option
                  value=""
                  selected
                  disabled
                  hidden>
                  Selecione um Ramo
                </option>
                {ramos.map((ramo, index) => (
                  <option
                    key={index}
                    label={ramo.nome}
                    value={ramo.id}>
                    {ramo.nome}
                  </option>
                ))}
              </Field>

              <h6>Competencias</h6>
              <FieldArray name="competencias">
                {({ insert, remove, push }) => (
                  <div>
                    {values.competencias.length > 0 &&
                      values.competencias.map((com, idx) => (
                        <div
                          key={idx}
                          className="row">
                          <div>
                            <Field
                              name={`competencias.${idx}.id`}
                              as="select">
                              {competencias.map((com, index) => (
                                <option
                                  key={index}
                                  value={com.id}
                                  label={com.nome}>
                                  {com.nome}
                                </option>
                              ))}
                            </Field>
                            <button
                              type="button"
                              className="btn btn-danger"
                              onClick={() => remove(idx)}>
                              Remover Competencia
                            </button>
                          </div>
                        </div>
                      ))}
                    <button
                      type="button"
                      className="btn btn-success mt-2"
                      onClick={() => push()}>
                      Adicionar Competencia
                    </button>
                  </div>
                )}
              </FieldArray>
            </div>
            <label>
              <Field
                id="ativo"
                name="ativo"
                type="checkbox"
              />
              Ativo
            </label>
            <Field
              id="salario_min"
              name="salario_min"
              type="number"
              step="0.01"
              placeholder="Salario Minimo"
            />
            <Field
              id="salario_max"
              name="salario_max"
              type="text"
              placeholder="Salario Maximo"
            />
          </div>
          <button
            className="btn btn-success"
            type="submit">
            {edit ? 'Editar' : 'Cadastrar'}
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => router.back()}>
            Voltar
          </button>
        </Form>
      )}
    </Formik>
  );
}

export default VagasForm;
