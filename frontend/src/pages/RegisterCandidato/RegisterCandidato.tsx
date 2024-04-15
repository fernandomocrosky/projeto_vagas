import RegisterCandidatoForm from '../../components/RegisterCandidatoForm/RegisterCandidatoForm';
import './styles.css';

const PageStyle = ({ children }: React.PropsWithChildren) => {
  return <div className="register-candidato-style">{children}</div>;
};

function RegisterCandidato() {
  return (
    <div>
      <PageStyle>
        <RegisterCandidatoForm />
      </PageStyle>
    </div>
  );
}

export default RegisterCandidato;
