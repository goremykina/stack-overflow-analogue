import { Container, Box, Typography, TextField, Button } from "@mui/material";
import Link from '../../components/link/Link.tsx';
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { routes } from '../../routes.ts';

const schema = z.object({
    email: z.string().email().nonempty(),
    password: z.string().nonempty(),
});

const LoginPage = () => {
    const {
        control,
        handleSubmit,
    } = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            email: '',
            password: '',
        }
    });

    const onSubmit = (data: any) => {
        console.log("Form Data:", data);
    };

    return (
        <Container maxWidth="xs">
            <Box sx={{ mt: 8, p: 3, boxShadow: 3, borderRadius: 2, textAlign: "center" }}>
                <Typography variant="h5" gutterBottom>Login</Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Controller
                        control={control}
                        name="email"
                        render={({
                            field: { onChange, onBlur, value, name },
                            fieldState: { error },
                        }) => (
                            <TextField
                                required
                                fullWidth
                                label="Email"
                                variant="outlined"
                                margin="normal"
                                value={value}
                                onChange={onChange}
                                onBlur={onBlur}
                                name={name}
                                error={!!error}
                                helperText={error?.message}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="password"
                        render={({
                            field: { onChange, onBlur, value, name },
                            fieldState: { error },
                        }) => (
                            <TextField
                                required
                                fullWidth
                                label="Password"
                                type="password"
                                variant="outlined"
                                margin="normal"
                                value={value}
                                onChange={onChange}
                                onBlur={onBlur}
                                name={name}
                                error={!!error}
                                helperText={error?.message}
                            />
                        )}
                    />
                    <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                        Login
                    </Button>
                </form>

                <Box sx={{ mt: 2 }}>
                    <Typography variant="body2">
                        Don't have an account?{" "}
                        <Link to={routes.signUp} color="secondary">
                            Sign Up
                        </Link>
                    </Typography>
                </Box>
            </Box>
        </Container>
    );
};

export default LoginPage;