import { User } from "../../models/user.model.ts";
import { useEffect, useState } from "react";
import { getAllUsers } from "../../api/users.ts";
import { Box, CircularProgress, Pagination, Typography } from "@mui/material";
import UserCard from "../../components/user/UserCard.tsx";

const UsersPage = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true)
            try {
                const response = await getAllUsers(currentPage);
                setUsers(response.data);
                setTotalPages(response.meta.totalPages)
            } finally {
                setLoading(false);
            }
        }
        fetchUsers()
    }, [currentPage]);

    return (
        <Box>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "1rem"
            }}>
                <Typography sx={{ fontSize: '25px', }}>User list:</Typography>
                <Pagination
                    sx={{ marginBottom: "1rem" }}
                    count={totalPages}
                    onChange={(_event, page) => setCurrentPage(page)}
                />
            </Box>

            {loading
                ? <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '60vh'
                    }}
                >
                    <CircularProgress size={60} />
                </Box>
                : <Box
                    sx={{
                        display: 'flex',
                        gap: '1rem',
                        flexDirection: 'column',
                    }}>
                    {users.map((user, index) => (
                        <UserCard user={user} key={index}/>
                    ))}
                </Box>
            }
        </Box>
    );
};

export default UsersPage;