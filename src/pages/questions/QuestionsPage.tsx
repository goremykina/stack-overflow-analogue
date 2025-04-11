import { useEffect, useState } from 'react';
import { Box, CircularProgress, Pagination, Typography } from "@mui/material";
import QuestionCard from "../../components/question/QuestionCard.tsx";
import { getAllQuestions } from "../../api/questions.ts";
import { Question } from "../../models/question.model.ts";

const QuestionsPage = () => {
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [questions, setQuestions] = useState<Question[]>([]);

    useEffect(() => {
        const fetchQuestions = async () => {
            setLoading(true)
            try {
                const response = await getAllQuestions(currentPage);
                setQuestions(response.data);
                setTotalPages(response.meta.totalPages)
            } finally {
                setLoading(false);
            }
        }

        fetchQuestions()
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
                <Typography sx={{ fontSize: '25px', }}>Questions:</Typography>
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
                    {questions.map(question => (
                        <QuestionCard question={question} username={question.user.username} />
                    ))}
                </Box>
            }
        </Box>
    )
};

export default QuestionsPage;