'use client';
import { Formik, Form, Field, FieldArray } from 'formik';
import { getCompetencias } from '../_api/competencias';
import CadastroFormButtons from './CadastroFormButtons';
import { useUser } from '../_stores/useUser';
import styles from '../styles/components/LoginForm.module.css';
import React from 'react';

function CandidatoForm({ handleSubmit, initialValues }) {
  const { user } = useUser((state) => ({ user: state.user }));
  const [competencias, setCompetencias] = React.useState([]);

  React.useEffect(() => {
    getCompetencias()
      .then((res) => {
        setCompetencias(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}>
      {({ values }) => (
        <Form>
          <div className={styles.formCard}>
            <div className={styles.formFields}>
              <Field
                className="form-control"
                name="nome"
                id="nome"
                placeholder="*Nome"
                type="text"
              />
              <Field
                className="form-control"
                name="email"
                id="email"
                placeholder="*E-mail"
                type="email"
              />
              <Field
                className="form-control"
                hidden={localStorage.getItem('token') ? true : false}
                name="senha"
                id="senha"
                placeholder="*Password"
                type="password"
              />
              <h4>Experiencias</h4>
              <FieldArray name="experiencias">
                {({ insert, remove, push }) => (
                  <div>
                    {values.experiencias.length > 0 &&
                      values.experiencias.map((exp, idx) => (
                        <div
                          key={idx}
                          className="row">
                          <div className="col-4">
                            <Field
                              name={`experiencias.${idx}.nome_empresa`}
                              placeholder="Nome Empresa"
                            />
                          </div>
                          <div className="col-4">
                            <Field
                              name={`experiencias.${idx}.cargo`}
                              placeholder="Cargo"
                            />
                          </div>
                          <div className="col-2">
                            <Field
                              name={`experiencias.${idx}.inicio`}
                              placeholder="inicio"
                              type="date"
                            />
                          </div>
                          <div className="col-2">
                            <Field
                              name={`experiencias.${idx}.fim`}
                              placeholder="fim"
                              type="date"
                            />
                          </div>
                          <div>
                            <button
                              type="button"
                              className="btn btn-danger"
                              onClick={() => remove(idx)}>
                              Remover Experiencia
                            </button>
                          </div>
                        </div>
                      ))}
                    <button
                      type="button"
                      className="btn btn-success mt-2"
                      onClick={() =>
                        push({
                          nome_empresa: '',
                          cargo: '',
                          inicio: '',
                          fim: '',
                        })
                      }>
                      Adicionar Experiencia
                    </button>
                  </div>
                )}
              </FieldArray>
              <hr></hr>
              <h4>Competencias</h4>
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
              <CadastroFormButtons user={user} />
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default CandidatoForm;
