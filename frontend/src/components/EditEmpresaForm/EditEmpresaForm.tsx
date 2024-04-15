import { useEffect, useState } from 'react';
import useUserStore from '../../stores/useUserStore';
import './styles.css';

function EditEmpresaForm() {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  const { user } = useUserStore((state) => ({
    user: state.user,
  }));

  console.log(user);

  const [changedData, setChangedData] = useState({ ...user, password: '' });

  useEffect(() => {
    setChangedData({ ...user, password: '' });
  }, []);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.currentTarget;
    setChangedData({ ...changedData, [name]: value });
  }

  return (
    <div className="edit-card">
      <h1>Edit Empresa</h1>

      <div className="edit-form-card">
        <form onSubmit={handleSubmit}>
          <div className="row edit-form-row">
            <div className="col">
              <div className="form-group edit-form-group">
                <label htmlFor="name">Nome Empresa:</label>
                <input
                  id="name"
                  className="form-control edit-control"
                  type="text"
                  placeholder=""
                  name="name"
                  onChange={handleChange}
                  value={changedData.name}></input>
              </div>
            </div>

            <div className="col">
              <div className="form-group edit-form-group">
                <label htmlFor="email">Email: </label>
                <input
                  id="email"
                  className="form-control edit-control"
                  type="text"
                  placeholder=""
                  name="email"
                  onChange={handleChange}
                  value={changedData.email}></input>
              </div>
            </div>

            <div className="col">
              <div className="form-group edit-form-group">
                <label htmlFor="ramo">Ramo: </label>
                <input
                  id="ramo"
                  className="form-control edit-control"
                  type="text"
                  placeholder=""
                  name="ramo"
                  onChange={handleChange}
                  value={changedData.ramo}></input>
              </div>
            </div>
          </div>

          <div className="row edit-form-row">
            <div className="col-8">
              <div className="form-group edit-form-group">
                <label htmlFor="descricao">Descricao: </label>
                <textarea
                  className="form-control edit-control"
                  id="descricao"
                  name="descricao"
                  onChange={handleChange}
                  value={changedData.descricao}
                  rows={4}></textarea>
              </div>
            </div>

            <div className="col">
              <div className="form-group edit-form-group">
                <label htmlFor="descricao">Password: </label>
                <input
                  type="password"
                  onChange={handleChange}
                  className="form-control edit-control"></input>
              </div>
            </div>
          </div>

          <div>
            <button className="btn btn-primary btn-lg">Save</button>
            <button className="btn btn-danger btn-lg ms-5">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditEmpresaForm;
