import { useInputValidation } from "6pp";
import { Button, Container, Paper, TextField, Typography } from "@mui/material";
import { Navigate } from "react-router-dom";

const isAdmin = true;

const AdminLogin = () => {


    const secretKey = useInputValidation("");

    const submitHandler = (e) => {
        e.preventDefault();
    }

    if (isAdmin) {
        return <Navigate to="/admin/dashboard" />;
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

                    <Typography
                        sx={{
                            fontWeight: "bold",
                            color: "#2a1f62",
                            fontFamily: `"Cascadia Code", Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace`,
                            fontSize: "2rem",
                        }}>
                        Login As Admin
                    </Typography>
                    <form
                        style={{
                            width: "100%",
                            marginTop: "1rem",
                        }}
                        onSubmit={submitHandler}
                    >
                        <TextField
                            required
                            fullWidth
                            label="Secret Key"
                            margin="normal"
                            variant="outlined"
                            type='password'
                            value={secretKey.value}
                            onChange={secretKey.changeHandler}
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
                    </form>

                </Paper>
            </Container>
        </div>
    )
}

export default AdminLogin