import { Container, Box, Typography, TextField, Button } from "@mui/material";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createAccount } from "../../api/auth.ts";
import { useNavigate } from "react-router-dom";
import { routes } from "../../routes.ts";
import { useState } from "react";

const schema = z.object({
    email: z.string().email().nonempty(),
    password: z.string()
        .min(6)
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[0-9]/, "Password must contain at least one number")
        .regex(/[\W_]/, "Password must contain at least one symbol"),
    passwordConfirmation: z.string().min(6)
}).refine((data) => data.password === data.passwordConfirmation, {
    message: 'Passwords do not match',
    path: ['passwordConfirmation'],
});

const SignUpPage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const {
        control,
        handleSubmit,
    } = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            email: '',
            password: '',
            passwordConfirmation: '',
        },
        disabled: loading,
    });

    const onSubmit = async (data: { email: string, password: string }) => {
        try {
            setLoading(true);
            await createAccount({
                username: data.email,
                password: data.password,
            });
            navigate(routes.login);
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="xs">
            <Box sx={{ mt: 8, p: 3, boxShadow: 3, borderRadius: 2, textAlign: "center" }}>
                <Typography variant="h5" gutterBottom>Sign Up</Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Controller
                        control={control}
                        name="email"
                        render={({
                            field: { onChange, onBlur, value, name, disabled },
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
                                disabled={disabled}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="password"
                        render={({
                            field: { onChange, onBlur, value, name, disabled },
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
                                disabled={disabled}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="passwordConfirmation"
                        render={({
                            field: { onChange, onBlur, value, name, disabled },
                            fieldState: { error },
                        }) => (
                            <TextField
                                required
                                fullWidth
                                label="Password Confirmation"
                                type="password"
                                variant="outlined"
                                margin="normal"
                                value={value}
                                onChange={onChange}
                                onBlur={onBlur}
                                name={name}
                                error={!!error}
                                helperText={error?.message}
                                disabled={disabled}
                            />
                        )}
                    />

                    <Button type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth sx={{ mt: 2 }}
                            loading={loading}
                    >
                        Sign Up
                    </Button>
                </form>
            </Box>
        </Container>
    );
};

export default SignUpPage;