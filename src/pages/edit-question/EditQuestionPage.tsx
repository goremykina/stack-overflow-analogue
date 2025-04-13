import { Box, Button, TextField, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import {  useState } from "react";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism.css";
import { createQuestion } from "../../api/questions.ts";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
    title: z.string().nonempty(),
    description: z.string().nonempty(),
    attachedCode: z.string(),
});
type Schema = z.infer<typeof schema>;

const EditQuestionPage = () => {
    const [loading, setLoading] = useState(false);
    const { handleSubmit, control, reset } = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            title: '',
            description: '',
            attachedCode: '',
        },
        disabled: loading
    });

    const handleQuestion = async (data: Schema) => {
        try {
            setLoading(true);
            await createQuestion({
                title: data.title,
                description: data.description,
                attachedCode: data.attachedCode,
            });
            reset();
        } finally {
            setLoading(false);
        }
    }

    return (
        <Box>
            <Typography sx={{ fontWeight: '600' }}>Ask a question</Typography>
                <form onSubmit={handleSubmit(handleQuestion)}>
                    <Controller
                        control={control}
                        name="title"
                        render={({
                            field: { onChange, onBlur, value, name },
                            fieldState: { error },
                        }) => (
                            <TextField
                                fullWidth
                                label="Question title"
                                variant="outlined"
                                margin="normal"
                                value={value}
                                onChange={onChange}
                                onBlur={onBlur}
                                name={name}
                                error={!!error}
                                helperText={error?.message}
                                required={true}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="description"
                        render={({
                            field: { onChange, onBlur, value, name },
                            fieldState: { error },
                        }) => (
                            <TextField
                                fullWidth
                                label="Question description"
                                variant="outlined"
                                margin="normal"
                                value={value}
                                onChange={onChange}
                                onBlur={onBlur}
                                name={name}
                                error={!!error}
                                helperText={error?.message}
                                required={true}
                            />
                        )}
                    />

                    <Typography sx={{ mt: 2 }}>Attached your code:</Typography>

                    <Controller
                        control={control}
                        name="attachedCode"
                        render={({
                            field: { onChange, onBlur, value, name },
                        }) => (
                            <Editor
                                name={name}
                                value={value}
                                onValueChange={onChange}
                                onBlur={onBlur}
                                highlight={(code) => highlight(code, languages.javascript, 'javascript')}
                                padding={10}
                                style={{
                                    minHeight: '200px',
                                    backgroundColor: "#f5f5f5",
                                    overflow: 'auto'
                                }}
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
    );
};

export default EditQuestionPage;