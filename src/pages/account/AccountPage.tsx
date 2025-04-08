import { Box, Button, Card, CardContent, IconButton, TextField, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LogoutIcon from '@mui/icons-material/Logout';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import { Controller, useForm } from "react-hook-form";
import theme from "../../theme.ts";
import { routes } from '../../routes.ts';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { changePassword, fetchStatistics } from "../../api/users.ts";

interface AccountPageProps {
    userName: string,
    id: string,
    role: string,
}

const schema = z.object({
    oldPassword: z.string().nonempty(),
    password: z.string()
        .min(6)
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[0-9]/, "Password must contain at least one number")
        .regex(/[\W_]/, "Password must contain at least one symbol"),
    passwordConfirmation: z.string().nonempty()
}).refine((data) => data.password === data.passwordConfirmation, {
    message: 'Passwords do not match',
    path: ['passwordConfirmation'],
});

const nameSchema = z.object({
    username: z.string().min(3, 'Name must be at least 3 characters'),
});

const AccountPage: FC<AccountPageProps> = ({ userName='Alina', id='1', role='user' }) => {
    const [loading, setLoading] = useState(false);
    const [isShow, setIsShow] = useState(false);

    const {
        control,
        handleSubmit,
    } = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            oldPassword: '',
            password: '',
            passwordConfirmation: '',
        },
        disabled: loading,
    });

    const {
        control: nameControl,
        handleSubmit: handleNameSubmit,
    } = useForm({
        resolver: zodResolver(nameSchema),
        defaultValues: {
            username: '',
        },
    });


    useEffect(() => {
        fetchStatistics(id)
            .then(response => console.log(response));
    }, [id]);

    const onSubmit = async (data: { oldPassword: string, password: string }) => {
        try {
            setLoading(true);
            await changePassword({
                newPassword: data.password,
                oldPassword: data.oldPassword,
            });
        } finally {
            setLoading(false);
        }

        console.log(data)
    };

    const onNameSubmit = (data: { username: string }) => {
        console.log('New name:', data.username);
    };

    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: '20px',
        }}>
            <Typography component={'h2'}>Welcome, {userName}</Typography>
            <Card sx={{
                width: '100%'
            }}>
                <Box sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "50px",
                }}>
                    <PersonOutlineIcon sx={{
                        width: "150px",
                        height: "150px"
                    }} />
                    <Box>
                        <Typography component={'h3'}>{userName}</Typography>
                        <Box>
                            <Typography component={'p'}>Id: {id}</Typography>
                            <Typography component={'p'}>Role: {role}</Typography>
                        </Box>
                        <Box>
                            <IconButton href={routes.login}>
                                <LogoutIcon sx={{ color: `${theme.palette.secondary.main}` }}/>
                            </IconButton>

                            <IconButton >
                                <DeleteOutlineIcon sx={{ color: `${theme.palette.secondary.main}`}}/>
                            </IconButton>

                            <IconButton onClick={() => setIsShow(!isShow)}>
                                <ModeEditOutlineOutlinedIcon sx={{ color: `${theme.palette.secondary.main}`}}/>
                            </IconButton>

                        </Box>
                    </Box>
                </Box>
                <CardContent></CardContent>
            </Card>

            {isShow &&
                <Card sx={{
                    width: '100%',
                    display: 'flex',
                    padding: '24px',
                    justifyContent: 'space-between',
                    gap: '20px',
                }}>
                    <Box sx={{ width: '100%'}}>
                        <Typography component={'h2'}>Edit your profile:</Typography>
                        <Typography component={'h2'}>Change your username:</Typography>
                        <form onSubmit={handleNameSubmit(onNameSubmit)}>
                            <Controller
                                control={nameControl}
                                name="username"
                                render={({
                                    field: { onChange, onBlur, value, name },
                                    fieldState: { error },
                                }) => (
                                    <TextField
                                        fullWidth
                                        label="New username"
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
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth sx={{ mt: 2 }}
                                loading={loading}
                            >
                                Save
                            </Button>
                        </form>
                    </Box>

                    <Box sx={{ width: '100%'}}>
                        <Typography component={'h2'}>Change your password:</Typography>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Controller
                                control={control}
                                name="oldPassword"
                                render={({
                                    field: { onChange, onBlur, value, name },
                                    fieldState: { error },
                                }) => (
                                    <TextField
                                        required
                                        fullWidth
                                        type="password"
                                        label="Old password"
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
                                        label="New password"
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

                            <Controller
                                control={control}
                                name="passwordConfirmation"
                                render={({
                                    field: { onChange, onBlur, value, name },
                                    fieldState: { error },
                                }) => (
                                    <TextField
                                        required
                                        fullWidth
                                        label="Confirm password"
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

                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth sx={{ mt: 2 }}
                                loading={loading}
                            >
                                Save
                            </Button>
                        </form>
                    </Box>
                </Card>
            }
        </Box>
    )
};

export default AccountPage;