import {SubmitHandler, useForm} from "react-hook-form";
import {Link as NavLink, useNavigate} from "react-router-dom";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import "./login.style.scss";
import {useUserDispatch} from "../../contexts/userContext.tsx";
import {getUser, User} from "../../components/User/user.service.ts";
import {useState} from "react";
import {Alert} from "@mui/material";

export default function Login() {
    const [errorMessage, setErrorMessage] = useState<string>('');
    const {
        register,
        formState: {errors},
        handleSubmit,
    } = useForm<Partial<User>>();
    const navigate = useNavigate();
    const dispatch = useUserDispatch();
    const user = getUser();

    const onSubmit: SubmitHandler<User> = async ({email, password}) => {
        if (user) {
            if (email == user.email && password == user.password) {
                dispatch({type: "login", payload: user})
                navigate('/')
                setErrorMessage('')
            }
        } else {
            setErrorMessage('Email or password are wrong!')
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{mt: 1}}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        autoComplete="email"
                        {...register("email", {
                            required: "email is required!",
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: "Entered value does not match email format",
                            },
                        })}
                        error={!!errors?.email}
                        helperText={errors?.email?.message}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                        {...register("password", {
                            required: "password is required!",
                            minLength: {
                                value: 6,
                                message: "min length is 6",
                            },
                        })}
                        error={!!errors?.password}
                        helperText={errors?.password?.message}
                    />
                    {errorMessage ? <Alert severity="error">{errorMessage}</Alert> : null}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item>
                            <NavLink to="/auth/register">
                                {"Don't have an account? Sign Up"}
                            </NavLink>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}