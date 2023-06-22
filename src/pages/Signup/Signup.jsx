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

export const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log(email, password);
  const submit = async (e) => {
    e.preventDefault();
    if (password === password2) {
      try {
        const user = await AuthAPI.signup(email, password);
        dispatch(setUser(user));
        await toast("success", "Signup succeed, you are now logged in.");
        navigate("/");
      } catch (error) {
        toast("error", error.message);
      }
    } else {
      toast("error", "Password don't match");
    }
  };

  const form = (
    <div className={s.formContainer}>
      <h2 className={s.title}>
        Signup <br />
        to access your team Notes
      </h2>
      <form onSubmit={submit} className={s.formGroup}>
        <Input placeholder={"Email"} onTextChange={setEmail} />
        <Input
          placeholder={"Password"}
          type="Password"
          onTextChange={setPassword}
        />

        <Input
          placeholder={"Password (repeat)"}
          type="Password"
          onTextChange={setPassword2}
        />

        <ButtonPrimary type={"submit"} className={s.button}>
          Sign up !
        </ButtonPrimary>
        <span>
          Already have an account ? <Link to={"/signin"}>Sign in</Link>
        </span>
      </form>
    </div>
  );
  return <AuthLayout>{form}</AuthLayout>;
};
