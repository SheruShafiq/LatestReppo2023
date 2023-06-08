import Scale from "@mui/icons-material/Scale";
import { Button } from "@mui/material";
import React from "react";
import logo from "../assets/EherkenningLogo.svg";
import { useAppSelector } from "../lib/hooks/useAppSelector";
import { selectSessionCsrf } from "../lib/redux/slices/sessionSlice";

const LoginButton = () => {
  const csrfToken = useAppSelector(selectSessionCsrf);

  return (
    <form action="/api/auth/developer" method="post" data-testid="form">
      <input type="hidden" name="authenticity_token" value={csrfToken} />
      <Button
        variant="outlined"
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: "270px",
          height: "37px",
          color: "#3C4653",
          borderColor: "#3C4653",
        }}
        disableRipple
        type="submit"
        name="login"
        data-testid="button"
      >
        INLOGGEN MET
        <img
          src={logo}
          style={{
            position: "relative",
            top: "2px",
            width: "117px",
            height: "auto",
            scale: "1.2",
          }}
        />
      </Button>
    </form>
  );
};

export default LoginButton;
