import React from "react";
import { Alert, AlertTitle, Slide } from "@mui/material";
import { useGlobalContext } from "../../context/appContext";

function CustomAlert() {
  const { alert } = useGlobalContext();
  return (
    <Slide direction="left" in={"true"} mountOnEnter unmountOnExit>
      <Alert severity={alert.type}>
        {/* <AlertTitle>Error</AlertTitle> */}
        {alert.msg}
      </Alert>
    </Slide>
  );
}

export default CustomAlert;
