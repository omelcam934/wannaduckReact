import {
  Stack,
  TextField,
  IconButton,
  InputAdornment,
  Button,
  Typography,
  FormControlLabel,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/system";
import Duck from "../../assets/duck.png";
import { Context } from "../context/Context";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Checkbox } from "@mui/material";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC5fvNVD8TGscBrMvQ6OeZSSbdI_AbyJxo",
  authDomain: "reactomelcam934.firebaseapp.com",
  projectId: "reactomelcam934",
  storageBucket: "reactomelcam934.appspot.com",
  messagingSenderId: "565992897365",
  appId: "1:565992897365:web:ac9423b8adb150c9240ddc",
  measurementId: "G-X3MYKG4QRW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

const Login = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  let navigate = useNavigate();

  const [user, setUser] = useContext(Context);

  const [mensajeError, setMensajeError] = useState("");
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [recuerdame, setRecuerdame] = useState(true);

  const tryLogin = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        setUser(userCredential.user);
        if (recuerdame)
          localStorage.setItem("user", JSON.stringify(userCredential.user));
        else localStorage.removeItem("user");
        navigate("/");
      })
      .catch((error) => {
        setMensajeError(error.message);
      });
  };

  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");

  const handleSummit = () => {
    setErrorEmail(false);
    setErrorPassword(false);

    if (email === "") {
      setErrorEmail(true);
      setMensajeError("El email es requerido");
      return;
    }
    if (password === "") {
      setErrorPassword(true);
      setMensajeError("La contraseña es requerida");
      return;
    }

    tryLogin(email, password);
  };

  const handleEnter = (event) => {
    if (event.key == "Enter") handleSummit();
  };

  return (
    <Box justifyContent="center" sx={{ display: "flex" }}>
      <Stack width={350} justifySelf="center">
        <Box sx={{ color: "primary.main" }}>
          <p>{mensajeError}</p>
        </Box>
        <TextField
          id="email"
          margin="normal"
          label="email*"
          variant="standard"
          sx={{
            input: { color: "primary.white" },
            "& label": { color: "primary.white" },
          }}
          onChange={(state) => {
            setEmail(state.target.value);
          }}
          error={errorEmail}
          onKeyDown={handleEnter}
        />
        <TextField
          id="password"
          type={showPassword ? "text" : "password"}
          label="password*"
          variant="standard"
          sx={{
            input: { color: "primary.white" },
            "& label": { color: "primary.white" },
          }}
          margin="normal"
          onChange={(state) => {
            setPass(state.target.value);
          }}
          error={errorPassword}
          onKeyDown={handleEnter}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  sx={{ color: "primary.main" }}
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  //onMouseDown={}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <FormControlLabel
          sx={{ color: "primary.main", padding: 2 }}
          control={<Checkbox checked={recuerdame} />}
          label="Recuerdame"
          onChange={(event) => setRecuerdame(event.target.checked)}
        />
        <Button
          variant="contained"
          color="primary"
          sx={{ borderRadius: "16px", marginBottom: "20px" }}
          onClick={handleSummit}
        >
          Login
        </Button>
        <Typography
          gutterBottom
          variant="h2"
          component="div"
          sx={{ color: "primary.main" }}
          justifyContent="center"
          marginTop={2}
        >
          Wannaduck
        </Typography>
        <img width={300} height={300} src={Duck} />
      </Stack>
    </Box>
  );
};

export default Login;
