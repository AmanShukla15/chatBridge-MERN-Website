import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '1rem' }}>
            <div style={{
                backgroundImage: 'url(https://cdn.dribbble.com/users/722246/screenshots/3066818/404-page.gif)',
                height: '650px',
                width: '100%',
                maxWidth: '1000px',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'contain',
            }}>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    onClick={() => navigate('/')}
                    sx={{
                        backgroundColor: "#00308F",
                        border: "2px solid #422800",
                        borderRadius: "30px",
                        boxShadow: "4px 4px 0 0 #422800",
                        color: "#fff",
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
                            color: "#000",
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
                    Go To Home
                </Button>
            </div>
        </div>
    );
}

export default NotFound;
