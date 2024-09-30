import { useState } from 'react'
import { Avatar, Button, Container, IconButton, Paper, Stack, TextField, Typography } from "@mui/material"
import { CameraAlt as CameraAltIcon } from "@mui/icons-material"
import toast from "react-hot-toast";
import { VisuallyHiddenInput } from '../components/styles/StyledComponents';
import { useFileHandler, useInputValidation } from "6pp"
import { usernameValidator } from '../utils/validators';
import { useDispatch } from 'react-redux';
import { server } from '../constants/config';
import axios from 'axios';

const Login = () => {

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const toggleLogin = () => setIsLogin((prev) => !prev);

  const name = useInputValidation("");
  const bio = useInputValidation("");
  const username = useInputValidation("", usernameValidator);
  const password = useInputValidation("");

  const avatar = useFileHandler("single");

  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();

    const toastId = toast.loading("Logging In...");

    setIsLoading(true);
    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        `${server}/api/v1/user/login`,
        {
          username: username.value,
          password: password.value,
        },
        config
      );
      dispatch(userExists(data.user));
      toast.success(data.message, {
        id: toastId,
      });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something Went Wrong", {
        id: toastId,
      });
    } finally {
      setIsLoading(false);
    }
  }
  const handleSignUp = async (e) => {
    e.preventDefault();

    const toastId = toast.loading("Signing Up...");
    setIsLoading(true);

    const formData = new FormData();
    formData.append("avatar", avatar.file);
    formData.append("name", name.value);
    formData.append("bio", bio.value);
    formData.append("username", username.value);
    formData.append("password", password.value);

    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    try {
      const { data } = await axios.post(
        `${server}/api/v1/user/new`,
        formData,
        config
      );

      dispatch(userExists(data.user));
      toast.success(data.message, {
        id: toastId,
      });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something Went Wrong", {
        id: toastId,
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div
      style={{
        backgroundImage: `
      linear-gradient(90deg, #fbeee0 0%, #fbefe3 25%, #fbf1e6 50%, #fcf3e9 75%, #fcf4ec 100%)
    `,
      }}
    >
      <Container
        component={"main"}
        maxWidth="xs"
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}>
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "#F5F5FA"
          }}
        >
          {
            isLogin ? (
              <>
                <Typography
                  sx={{
                    fontWeight: "bold",
                    color: "#2a1f62",
                    fontFamily: `"Cascadia Code", Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace`,
                    fontSize: "2rem",
                  }}>
                  Login
                </Typography>
                <form
                  style={{
                    width: "100%",
                    marginTop: "1rem",
                  }}
                  onSubmit={handleLogin}
                >
                  <TextField
                    required
                    fullWidth
                    label="Username"
                    margin="normal"
                    variant="outlined"
                    value={username.value}
                    onChange={username.changeHandler}
                  />
                  <TextField
                    required
                    fullWidth
                    label="Password"
                    margin="normal"
                    variant="outlined"
                    type='password'
                    value={password.value}
                    onChange={password.changeHandler}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    fullWidth
                    sx={{
                      marginTop: "1rem",
                      backgroundColor: "#fbeee0",
                      border: "2px solid #422800",
                      borderRadius: "30px",
                      boxShadow: "4px 4px 0 0 #422800",
                      color: "#422800",
                      cursor: "pointer",
                      display: "inline-block",
                      fontWeight: 600,
                      fontSize: "18px",
                      padding: "0 18px",
                      lineHeight: "50px",
                      textAlign: "center",
                      textDecoration: "none",
                      userSelect: "none",
                      WebkitUserSelect: "none",
                      touchAction: "manipulation",
                      "&:hover": {
                        backgroundColor: "#fff",
                      },
                      "&:active": {
                        boxShadow: "2px 2px 0 0 #422800",
                        transform: "translate(2px, 2px)",
                      },
                      "@media (min-width: 768px)": {
                        minWidth: "120px",
                        padding: "0 25px",
                      },
                    }}
                  >
                    Login
                  </Button>

                  <Typography
                    textAlign={"center"}
                    m={"1rem"}
                    sx={{
                      fontWeight: "bold",
                      color: "#2a1f62",
                      fontFamily: `"Cascadia Code", Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace`,
                      fontSize: "1rem", // Bigger size
                    }}
                  >
                    or
                  </Typography>

                  <Button
                    variant="text"
                    fullWidth
                    type="submit"
                    onClick={toggleLogin}
                    sx={{
                      alignItems: "center",
                      background: "#FFFFFF",
                      border: "0 solid #E2E8F0",
                      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                      boxSizing: "border-box",
                      color: "#1A202C",
                      display: "inline-flex",
                      fontFamily: "Inter, sans-serif",
                      fontSize: "1rem",
                      fontWeight: 700,
                      height: "56px",
                      justifyContent: "center",
                      lineHeight: "24px",
                      overflowWrap: "break-word",
                      padding: "24px",
                      textDecoration: "none",
                      width: "100%",
                      borderRadius: "8px",
                      cursor: "pointer",
                      userSelect: "none",
                      WebkitUserSelect: "none",
                      touchAction: "manipulation",
                    }}
                  >
                    Sign Up Instead
                  </Button>
                </form>
              </>
            ) : (
              <>
                <Typography
                  variants="h5"
                  sx={{
                    fontWeight: "bold",
                    color: "#2a1f62",
                    fontFamily: `"Cascadia Code", Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace`,
                    fontSize: "2rem", // Bigger size
                  }}
                >
                  Sign Up
                </Typography>
                <form
                  style={{
                    width: "100%",
                    marginTop: "1rem",
                  }}
                  onSubmit={handleSignUp}
                >
                  <Stack
                    position={"relative"}
                    width={"10rem"}
                    margin={"auto"}
                  >
                    <Avatar
                      sx={{
                        width: "10rem",
                        height: "10rem",
                        objectFit: "contain",
                      }}
                      src={avatar.preview}
                    />


                    <IconButton
                      sx={{
                        position: "absolute",
                        bottom: "0",
                        right: "0",
                        color: "white",
                        bgcolor: "rgba(0, 0, 0, 0.5)",
                        ":hover": {
                          bgcolor: "rgba(0, 0, 0, 0.7)",
                        }
                      }}
                      component="label"
                    >
                      <>
                        <CameraAltIcon />
                        <VisuallyHiddenInput
                          type='file'
                          onChange={avatar.changeHandler}
                        />
                      </>
                    </IconButton>
                  </Stack>
                  {
                    avatar.error && (
                      <Typography
                        m={"1rem auto"}
                        width={"fit-content"}
                        display={"block"}
                        color="error"
                        variant="caption">
                        {avatar.error}
                      </Typography>
                    )
                  }

                  <TextField
                    required
                    fullWidth
                    label="Name"
                    margin="normal"
                    variant="outlined"
                    value={name.value}
                    onChange={name.changeHandler}
                  />
                  <TextField
                    required
                    fullWidth
                    label="Bio"
                    margin="normal"
                    variant="outlined"
                    value={bio.value}
                    onChange={bio.changeHandler}
                  />
                  <TextField
                    required
                    fullWidth
                    label="Username"
                    margin="normal"
                    variant="outlined"
                    value={username.value}
                    onChange={username.changeHandler}
                  />
                  {
                    username.error && (
                      <Typography color="error" variant="caption">
                        {username.error}
                      </Typography>
                    )
                  }
                  <TextField
                    required
                    fullWidth
                    label="Password"
                    margin="normal"
                    variant="outlined"
                    type='password'
                    value={password.value}
                    onChange={password.changeHandler}
                  />

                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    fullWidth
                    sx={{
                      marginTop: "1rem",
                      backgroundColor: "#fbeee0",
                      border: "2px solid #422800",
                      borderRadius: "30px",
                      boxShadow: "4px 4px 0 0 #422800",
                      color: "#422800",
                      cursor: "pointer",
                      display: "inline-block",
                      fontWeight: 600,
                      fontSize: "18px",
                      padding: "0 18px",
                      lineHeight: "50px",
                      textAlign: "center",
                      textDecoration: "none",
                      userSelect: "none",
                      WebkitUserSelect: "none",
                      touchAction: "manipulation",
                      "&:hover": {
                        backgroundColor: "#fff",
                      },
                      "&:active": {
                        boxShadow: "2px 2px 0 0 #422800",
                        transform: "translate(2px, 2px)",
                      },
                      "@media (min-width: 768px)": {
                        minWidth: "120px",
                        padding: "0 25px",
                      },
                    }}
                  >
                    Sign Up
                  </Button>

                  <Typography
                    textAlign={"center"}
                    m={"1rem"}
                    sx={{
                      fontWeight: "bold",
                      color: "#2a1f62",
                      fontFamily: `"Cascadia Code", Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace`,
                      fontSize: "1rem", // Bigger size
                    }}
                  >
                    or
                  </Typography>

                  <Button
                    variant="text"
                    fullWidth
                    type="submit"
                    onClick={toggleLogin}
                    sx={{
                      alignItems: "center",
                      background: "#FFFFFF",
                      border: "0 solid #E2E8F0",
                      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                      boxSizing: "border-box",
                      color: "#1A202C",
                      display: "inline-flex",
                      fontFamily: "Inter, sans-serif",
                      fontSize: "1rem",
                      fontWeight: 700,
                      height: "56px",
                      justifyContent: "center",
                      lineHeight: "24px",
                      overflowWrap: "break-word",
                      padding: "24px",
                      textDecoration: "none",
                      width: "100%",
                      borderRadius: "8px",
                      cursor: "pointer",
                      userSelect: "none",
                      WebkitUserSelect: "none",
                      touchAction: "manipulation",
                    }}
                  >
                    Login Instead
                  </Button>
                </form>
              </>
            )
          }
        </Paper>
      </Container>
    </div>
  )
}

export default Login