import { Box, Card, CardContent, IconButton, Typography } from "@mui/material";
import { Question } from "../../models/question.model.ts";
import { FC, useState } from "react";
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { stackoverflowLight } from "react-syntax-highlighter/dist/esm/styles/hljs";
import SyntaxHighlighter from "react-syntax-highlighter";
import language from "react-syntax-highlighter/dist/cjs/languages/hljs/c";

interface UserProps {
    question: Question,
    username: string,
}

const QuestionCard: FC<UserProps> = ({ question, username}) => {
    const { title,  description, attachedCode} = question;
    const [isShow, setIsShow] = useState(false)

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
                    <IconButton onClick={() => setIsShow(true)}>
                        <ExpandMoreIcon sx={{
                            transition: 'transform 0.3s ease',
                            transform: `rotate(${isShow ? '180' : '0'}deg)`
                        }} />
                    </IconButton>
                </Box>

                <Box>
                    {description}
                </Box>

                {isShow &&
                    <SyntaxHighlighter language={language} style={stackoverflowLight} showLineNumbers={true}>
                        {attachedCode}
                    </SyntaxHighlighter>
                }

            </CardContent>
        </Card>
    );
};

export default QuestionCard;