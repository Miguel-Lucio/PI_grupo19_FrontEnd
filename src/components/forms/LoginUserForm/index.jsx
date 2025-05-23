import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { schema } from "./validator";
import { Input } from "../Input";
import styles from "./style.module.scss";
import { useContext, useState } from "react";
import { UserContext } from "../../../providers/UserContext";
import loadingImg from "../../../assets/loading.svg";

export const LoginUserForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const [loading, setLoading] = useState(false);

  const { userLogin } = useContext(UserContext);

  const submit = (data) => {
    userLogin(data, setLoading, reset);
  };
  return (
    <form onSubmit={handleSubmit(submit)}>
      <div className={styles.formBox}>
        <h2 className="title textCenter">Login</h2>
        <Input
          label="Email"
          type="email"
          placeholder="Digite aqui seu email"
          error={errors.email}
          disabled={loading}
          {...register("email")}
        />
        <Input
          label="Senha"
          type="password"
          placeholder="Digite aqui sua senha"
          error={errors.password}
          disabled={loading}
          {...register("password")}
        />

        {loading ? (
          <img src={loadingImg} />
        ) : (
          <div className={styles.registerBox}>
            <button type="submit" className="btn">
              {loading ? "Acessando..." : "Acessar"}
            </button>
            <div>
              <p className="text bold medium textCenter">
                Ainda não possui conta?
              </p>
              <p className="text medium gray300 textCenter">
                Clique no botão abaixo para se cadastrar rapidamente
              </p>
            </div>

            <Link to={"/register"}>
              <button className="btn transparent">Cadastre-se</button>
            </Link>
          </div>
        )}
      </div>
    </form>
  );
};
