import React from "react";
import s from "./style.module.css";
import { ReactComponent as LogoSVG } from "assets/images/logo.svg";
export const AuthLayout = ({ children }) => {
  const header = (
    <div className={s.header}>
      <LogoSVG className={s.logoTop} />
      <h3 className={s.logoTitle}>Note Manager</h3>
    </div>
  );

  const background = (
    <div>
      <div className="d-flex">
        <LogoSVG className={s.logo} />
        <h1 className={s.backgroundTitle}>Note Manager</h1>
      </div>
      <p style={{ color: "white" }}>One Place for the team notes</p>
    </div>
  );

  return (
    <div className={s.root}>
      {header}
      <div className={s.leftSection}>{children}</div>
      <div className={`${s.rightSection} d-none d-lg-flex`}>{background}</div>
    </div>
  );
};
