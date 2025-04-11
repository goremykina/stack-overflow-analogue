import { Box, Card, CardContent, IconButton, Typography } from "@mui/material";
import { Question } from "../../models/question.model.ts";
import { FC } from "react";
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface UserProps {
    question: Question,
    username: string,
}

const QuestionCard: FC<UserProps> = ({ question, username }) => {
    const { title,  description} = question;

    return (
        <Card >
            <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: '10px'}}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '20px'}}>
                        <Box>
                            <HelpOutlineOutlinedIcon sx={{ width: '30px', height: '30px' }}/>
                        </Box>
                        <Box>
                            <Typography>{title}</Typography>
                            <Typography>Asked by user: {username}</Typography>
                        </Box>
                    </Box>
                    <IconButton>
                        <ExpandMoreIcon sx={{
                            transition: 'transform 0.3s ease',
                        }} />
                    </IconButton>
                </Box>

                <Box>
                    {description}
                </Box>
            </CardContent>
        </Card>
    );
};

export default QuestionCard;