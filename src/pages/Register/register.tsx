import "./register.style.scss";
import {Link, useNavigate} from "react-router-dom";
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {SubmitHandler, useForm} from "react-hook-form";
import {User} from "../../components/User/user.service.ts";

export default function Register() {
    const {
        register,
        formState: {errors},
        handleSubmit,
    } = useForm<User>();
    const navigate = useNavigate();
    const onSubmit: SubmitHandler<User> = async (data) => {
        localStorage.setItem("user", JSON.stringify(data));
        navigate("/auth/login");
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{mt: 3}}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="given-name"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoFocus
                                {...register("firstName", {
                                    required: "first name is required!"
                                })}
                                error={!!errors?.firstName}
                                helperText={errors?.firstName?.message}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                autoComplete="family-name"
                                {...register("lastName", {
                                    required: "last name is required!"
                                })}
                                error={!!errors?.lastName}
                                helperText={errors?.lastName?.message}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
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
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
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
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                    >
                        Sign Up
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link to="/auth/login">{"Already have an account? Sign in"}</Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}

