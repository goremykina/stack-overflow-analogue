import {  useState } from 'react';
import {
    Box,
    Button,
    MenuItem,
    Select,
    SelectChangeEvent, TextareaAutosize,
    Typography
} from "@mui/material";
import theme from "../../theme";

const PostPage = () => {
    const [language, setLanguage] = useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setLanguage(event.target.value);
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            <Typography
                sx={{ textAlign: 'center', fontSize: '2rem' }}
                component={'h1'}
            >
                Create new snippet!
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                <Typography sx={{ fontSize: '1.2rem', fontWeight: '600' }} component={'h3'}>Language of your snippet:</Typography>
                <Select
                    value={language}
                    onChange={handleChange}
                >
                    <MenuItem value={'Python'}>Python</MenuItem>
                    <MenuItem value={'JavaScript'}>JavaScript</MenuItem>
                    <MenuItem value={'Java'}>Java</MenuItem>
                </Select>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                <Typography
                    sx={{ fontSize: '1.2rem', fontWeight: '600' }}
                    component={'h3'}
                >
                    Code of your snippet:
                </Typography>
                    <TextareaAutosize
                        value={'let a = 123;'}
                    >
                    </TextareaAutosize>
                <Button
                    sx={{
                        borderRadius: 1,
                        border: `1px solid ${theme.palette.primary.main}`,
                        backgroundColor: theme.palette.primary.main,
                        color: 'black',
                        fontSize: '1rem',
                        boxShadow: 'rgba(0, 0, 0, 0.35) 0px 3px 10px',
                    }}
                >
                    CREATE SNIPPET</Button>
            </Box>
        </Box>
    );
};

export default PostPage;