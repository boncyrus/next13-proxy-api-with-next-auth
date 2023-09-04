"use client";

import { signOut } from "next-auth/react";
import { FunctionComponent, PropsWithChildren } from "react";

const SecuredLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <header
        style={{
          position: "fixed",
          top: 8,
          right: 8,
        }}
      >
        <button type="button" onClick={() => signOut()}>
          Signout
        </button>
      </header>
      {children}
    </>
  );
};

export default SecuredLayout;
