import React, { useContext, useState} from "react";
import { Context } from "../context/Context";
import HeaderButton from "../headerButton/HeaderButton";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Button,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  ThemeProvider,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Tema from "../../themes/Tema";
import duck from "../../assets/duck.png";

const Header = () => {
  const [user, setUser, localDisplayName,] = useContext(Context);
  const [busqueda , setBusqueda] = useState("");
  const navigate = useNavigate();

  const handleCerrarSesion = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const handleSearch = () => {
    if(busqueda)
      navigate(`/search/${busqueda}`)
  }

  const handleEnter = (event) => {
    if (event.key === "Enter") handleSearch();
  };

  return (
    <ThemeProvider theme={Tema}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="start"
        spacing={1}
        height={100}
        sx={{ bgcolor: "fondo.main", borderBottom: "2px solid #ff8000" }}
      >
        <NavLink style={{ textDecoration: "none" }} to="/">
          <HeaderButton url={duck} title="" width="100px" />
        </NavLink>
        <TextField
          type="text"
          label="Buscar"
          variant="standard"
          fullWidth
          sx={{
            input: { color: "primary.main" },
            "& label": { color: "primary.main" },
          }}
          margin="normal"
          onChange={(state) => {
            setBusqueda(state.target.value);
          }}
          onKeyDown={handleEnter}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton IconButton
                  sx={{ color: "primary.main" }}
                  aria-label="toggle password visibility"
                  onClick={handleSearch}
                  //onMouseDown={}
                >
                <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        {(() => {
          if (user == null) {
            return (
              <>
                <NavLink style={{ textDecoration: "none" }} to="/login">
                  <Button
                    variant="outlined"
                    color="primary"
                    sx={{ borderRadius: "16px" }}
                  >
                    Login
                  </Button>
                </NavLink>
                <NavLink style={{ textDecoration: "none" }} to="/register">
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ borderRadius: "16px" }}
                  >
                    Registrarse
                  </Button>
                </NavLink>
              </>
            );
          } else {
            return (
              <>
                <NavLink style={{ textDecoration: "none" }} to="/user/myuser">
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ borderRadius: "16px" }}
                  >
                    {
                      localDisplayName
                    }
                  </Button>
                </NavLink>
                <Button
                  variant="outlined"
                  color="primary"
                  sx={{ borderRadius: "16px" }}
                  onClick={handleCerrarSesion}
                >
                  Cerrar sesion
                </Button>
              </>
            );
          }
        })()}
      </Stack>
    </ThemeProvider>
  );
};

export default Header;
