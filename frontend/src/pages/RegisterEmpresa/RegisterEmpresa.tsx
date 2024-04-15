import RegisterEmpresaForm from '../../components/RegisterEmpresaForm/RegisterEmpresaForm';
import './styles.css';

const PageStyle = ({ children }: React.PropsWithChildren) => {
  return <div className="register-empresa-style">{children}</div>;
};

function RegisterEmpresa() {
  return (
    <div>
      <PageStyle>
        <RegisterEmpresaForm />
      </PageStyle>
    </div>
  );
}

export default RegisterEmpresa;
