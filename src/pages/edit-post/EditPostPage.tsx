import { useEffect, useState } from 'react';
import {
    Box,
    Button, CircularProgress,
    MenuItem,
    Select,
    Typography
} from "@mui/material";
import { createPost, editPost, fetchPost } from "../../api/posts.ts";
import { Controller, useForm } from "react-hook-form";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate, useParams } from "react-router-dom";
import { routes } from "../../routes.ts";

const schema = z.object({
    language: z.string().nonempty(),
    attachedCode: z.string().nonempty(),
});
type Schema = z.infer<typeof schema>;

const availableLanguages = ["C#", "Go", "C/C++", "JavaScript", "Java", "Python", "Ruby", "Kotlin"];

const EditPostPage = () => {
    const { postId } = useParams<{ postId: string }>();
    const navigate = useNavigate();
    const [editMode, setEditMode] = useState(!!postId);

    const [loading, setLoading] = useState(false);
    const { handleSubmit, control, reset } = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            attachedCode: '',
            language: '',
        },
        disabled: loading
    });


    useEffect(() => {
        const newEditMode = !!postId;
        setEditMode(newEditMode);

        if (!newEditMode) {
            reset({
                attachedCode: '',
                language: '',
            });
        }

        if (postId) {
            setLoading(true);
            fetchPost(postId)
                .then(post => {
                    reset({
                        attachedCode: post.code,
                        language: post.language,
                    });
                })
                .finally(() => setLoading(false));
        }
    }, [postId])

    const handleQuestion = async (data: Schema) => {
        setLoading(true);

        try {
            if (editMode) {
                await editPost({
                    language: data.language,
                    code: data.attachedCode,
                }, postId!);
            } else {
                await createPost({
                    language: data.language,
                    code: data.attachedCode,
                });
            }

            navigate(routes.userPosts);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
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
                : <>
                    <Typography sx={{ textAlign: 'center', fontSize: '2rem' }}>
                        {!editMode
                            ? 'Create new snippet!'
                            : 'Change snippet'
                        }

                    </Typography>
                    <form onSubmit={handleSubmit(handleQuestion)} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                        <Typography sx={{ fontSize: '1.1rem', fontWeight: '600' }} component={'h3'}>Language of your snippet:</Typography>
                        <Controller
                            control={control}
                            name="language"
                            render={({
                                         field: { onChange, onBlur, value, name },
                                     }) => (

                                <Select
                                    name={name}
                                    value={value}
                                    onChange={onChange}
                                    onBlur={onBlur}
                                >
                                    {availableLanguages.map((lang, index) => (
                                        <MenuItem value={lang} key={index}>{lang}</MenuItem>
                                    ))}
                                </Select>
                            )}
                        />

                        <Typography sx={{ fontSize: '1.1rem', fontWeight: '600' }}>Code of your snippet:</Typography>

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
                            {!editMode
                                ? 'CREATE SNIPPET'
                                : 'EDIT SNIPPET'
                            }
                        </Button>
                    </form>
                </>
            }
        </Box>
    );
};

export default EditPostPage;