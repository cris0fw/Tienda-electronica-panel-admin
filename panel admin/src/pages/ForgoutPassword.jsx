import CustomInput from "../components/CustomInput";

const ForgoutPassword = () => {
  return (
    <div className="py-3" style={{ background: "#ffd333", minHeight: "100vh" }}>
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="my-3 w-25 bg-white rounded-3 mx-auto p-4">
        <h3 className="text-center">¿Has olvidado tu contraseña?</h3>
        <p className="text-center">
          Por favor ingrese su correo electrónico de registro para recibir el
          correo electrónico de restablecimiento de contraseña.
        </p>

        <form action="">
          <CustomInput
            type="text"
            label="Ingrese su correo electronico"
            id="email"
          />

          <button
            className="border-0 px-3 py-2 text-white fw-bold w-100"
            type="submit"
            style={{ background: "#ffd333" }}
          >
            Enviar link
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgoutPassword;
