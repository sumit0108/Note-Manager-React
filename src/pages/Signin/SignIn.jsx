import { ButtonPrimary } from "components/ButtonPrimary/ButtonPrimary";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import s from "./style.module.css";
import { Input } from "components/Input/Input";
import { AuthLayout } from "layouts/AuthLayout/AuthLayout";
import { AuthAPI } from "api/auth";
import { setUser } from "store/auth/auth-slice";
import { useDispatch } from "react-redux";
import { toast } from "utils/sweet-alert";

export const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log(email, password);
  const submit = async (e) => {
    e.preventDefault();
    console.log("submit");
    try {
      const user = await AuthAPI.signin(email, password);
      dispatch(setUser(user));
      await toast("success", "Auth succeed");
      navigate("/");
    } catch (error) {
      toast("error", error.message);
    }
  };

  const form = (
    <div className={s.formContainer}>
      <h2 className={s.title}>
        Signin <br />
        to access your team Notes
      </h2>
      <form onSubmit={submit} className={s.formGroup}>
        <Input placeholder={"Email"} onTextChange={setEmail} />
        <Input
          placeholder={"Password"}
          type="Password"
          onTextChange={setPassword}
        />

        <ButtonPrimary type={"submit"} className={s.button}>
          Sign in !{" "}
        </ButtonPrimary>
        <span>
          Don't have an account yet ? <Link to={"/signup"}>sign in</Link>
        </span>
      </form>
    </div>
  );
  return <AuthLayout>{form}</AuthLayout>;
};
