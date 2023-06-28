import { useRegister } from "./hooks"
import "./Register.css"

function Register() {

    const {
        handleSubmit,
        errorMessage,
        firstName,
        lastName,
        email,
        phone,
        password,
        confirmPassword
    } = useRegister()

    return (
        <div className="registration-container">
            <h1 className="registration-header">Registro</h1>
            <hr />
            <form className="registration-form" onSubmit={handleSubmit}>
                <label className="registration-label" htmlFor="firstName">Nome</label>
                <input
                    className="registration-input"
                    type="text"
                    id="firstName"
                    value={firstName.value}
                    onChange={(event) => firstName.setValue(event.target.value)}
                    pattern="^[a-zA-Z0-9]{3,}$"
                    title= "Não pode haver caracteres especiais ou espaços"
                    required
                />
                <label className="registration-label" htmlFor="lastName">Sobrenome</label>
                <input
                    className="registration-input"
                    type="text"
                    id="lastName"
                    value={lastName.value}
                    onChange={(event) => lastName.setValue(event.target.value)}
                    pattern="^[a-zA-Z0-9]{3,}$"
                    title="Não pode haver caracteres especiais ou espaços"
                    required
                />
                <label className="registration-label" htmlFor="email">Email</label>
                <input
                    className="registration-input"
                    type="email"
                    id="email"
                    value={email.value}
                    onChange={(event) => email.setValue(event.target.value)}
                    required
                />
                <label className="registration-label" htmlFor="phone">Telefone</label>
                <input
                    className="registration-input"
                    type="tel"
                    id="phone"
                    value={phone.value}
                    onChange={(event) => phone.setValue(event.target.value)}
                    pattern="^[0-9()-]{11,}$"
                    title="Informar um telefone valido de até 11 digitos"
                    required
                />
                <label className="registration-label" htmlFor="password">Senha</label>
                <input
                    className="registration-input"
                    type="password"
                    id="password"
                    value={password.value}
                    onChange={(event) => password.setValue(event.target.value)}
                    pattern="^(?=.*[A-Z])(?=.*[!#@$%&])(?=.*[0-9])(?=.*[a-z]).{6,15}$"
                    title="Crie uma senha forte contendo letras maiúsculas, minúsculas, caracteres especiais e 8 caracteres"
                    required
                />
                <label className="registration-label" htmlFor="confirmPassword">Confirmar senha</label>
                <input
                    className="registration-input"
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword.value}
                    onChange={(event) => confirmPassword.setValue(event.target.value)}
                    required
                />
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <button type="submit">
                    Cadastrar
                </button>
            </form>
        </div>
    )
}

export default Register