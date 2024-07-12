// pages/addQuestion.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    useToast,
    Button,
    Text,
    Stack,
    Flex,
    Box,
    Center,
    Input,
    Textarea,
    Select,
} from "@chakra-ui/react";
import Navbar from "../components/navbar";
import { addQuizQuestion } from "../utils/apis";
import useAuthStore from "../authStore";

export default function AddQuestion() {
    const [loading, setLoading] = useState(false);
    const [question, setQuestion] = useState("");
    const [options, setOptions] = useState(["", "", "", ""]);
    const [correctAnswer, setCorrectAnswer] = useState("");
    const navigate = useNavigate();
    const { isAuth } = useAuthStore((state) => ({
        isAuth: state.isAuth,
    }));
    const toast = useToast();

    const handleOptionChange = (index, value) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        if (!isAuth) {
            toast({
                title: "Authentication Error",
                description: "Please log in to add a question",
                status: "error",
                duration: 2000,
                isClosable: true,
                position: "top",
            });
            return;
        }

        if (!question || !options.every(option => option) || !correctAnswer) {
            toast({
                title: "Validation Error",
                description: "All fields are required",
                status: "error",
                duration: 2000,
                isClosable: true,
                position: "top",
            });
            return;
        }

        setLoading(true);

        try {
            const response = await addQuizQuestion({ question, options, correctAnswer });

            if (response.status === 201) {
                toast({
                    title: "Success",
                    description: "Question added successfully!",
                    status: "success",
                    duration: 2000,
                    isClosable: true,
                    position: "top",
                    onCloseComplete: () => {
                        navigate("/home");
                    },
                });
            } else {
                throw new Error("Failed to add question");
            }
        } catch (err) {
            console.error("Question submission error:", err);
            toast({
                title: "Error",
                description: "Failed to add question",
                status: "error",
                duration: 2000,
                isClosable: true,
                position: "top",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar />
            <Center m={0} p={0}>
                <Stack>
                    <Text
                        textAlign="center"
                        color="#646681"
                        fontSize={["1.7rem", "2.2rem"]}
                        fontWeight="600"
                        mb={["1.5rem", "2rem"]}
                    >
                        Add New Question
                    </Text>
                    <Flex
                        direction="column"
                        bg="#ecedf6"
                        w={["20rem", "27rem"]}
                        px={["1rem", "2rem"]}
                        py={["1rem", "2rem"]}
                        borderRadius="0.4rem"
                        mb="1rem"
                    >
                        <form onSubmit={onSubmit}>
                            <Box mb={["1rem", "1.5rem"]}>
                                <Text mb="0.5rem" fontSize={["1.1rem", "1.2rem"]}>
                                    Question
                                </Text>
                                <Textarea
                                    value={question}
                                    onChange={(e) => setQuestion(e.target.value)}
                                    placeholder="Enter your question here"
                                    bg="#ffffff"
                                    borderRadius="0.4rem"
                                />
                            </Box>
                            {options.map((option, index) => (
                                <Box mb={["1rem", "1.5rem"]} key={index}>
                                    <Text mb="0.5rem" fontSize={["1.1rem", "1.2rem"]}>
                                        Option {index + 1}
                                    </Text>
                                    <Input
                                        value={option}
                                        onChange={(e) => handleOptionChange(index, e.target.value)}
                                        placeholder={`Option ${index + 1}`}
                                        bg="#ffffff"
                                        borderRadius="0.4rem"
                                    />
                                </Box>
                            ))}
                            <Box mb={["1rem", "1.5rem"]}>
                                <Text mb="0.5rem" fontSize={["1.1rem", "1.2rem"]}>
                                    Correct Answer
                                </Text>
                                <Select
                                    placeholder="Select correct answer"
                                    value={correctAnswer}
                                    onChange={(e) => setCorrectAnswer(e.target.value)}
                                    bg="#ffffff"
                                    borderRadius="0.4rem"
                                >
                                    {options.map((option, index) => (
                                        <option value={option} key={index}>
                                            {option}
                                        </option>
                                    ))}
                                </Select>
                            </Box>
                            <Center>
                                {loading ? (
                                    <Button isLoading loadingText="Submitting...">
                                        Submit
                                    </Button>
                                ) : (
                                    <Button
                                        type="submit"
                                        letterSpacing={1}
                                        mt={["1rem", ""]}
                                        fontSize={["1rem", "1.2rem"]}
                                        bg="#4250f5"
                                        color="white"
                                        _hover={{
                                            bg: "#2732b8",
                                        }}
                                    >
                                        Submit
                                    </Button>
                                )}
                            </Center>
                        </form>
                    </Flex>
                </Stack>
            </Center>
        </>
    );
}
