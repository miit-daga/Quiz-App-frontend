// pages/quiz.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    useToast,
    Button,
    Text,
    Stack,
    Flex,
    Box,
    Center,
    Radio,
    RadioGroup,
} from "@chakra-ui/react";
import Navbar from "../components/navbar";
import { getQuizQuestions, submitQuizAnswers } from "../utils/apis";
import useAuthStore from "../authStore";

export default function Quiz() {
    const [loading, setLoading] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});
    const navigate = useNavigate();
    const { isAuth, userId } = useAuthStore((state) => ({
        isAuth: state.isAuth,
        userId: state.userId,
    }));
    const toast = useToast();

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await getQuizQuestions();
                setQuestions(response.data.questions);
            } catch (error) {
                toast({
                    title: "Error",
                    description: "Failed to load quiz questions",
                    status: "error",
                    duration: 2000,
                    isClosable: true,
                    position: "top",
                });
            }
        };
        fetchQuestions();
    }, [toast]);

    const handleAnswerChange = (questionId, answer) => {
        setAnswers((prevAnswers) => ({
            ...prevAnswers,
            [questionId]: answer,
        }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        
        if (!isAuth) {
            toast({
                title: "Authentication Error",
                description: "Please log in to submit the quiz",
                status: "error",
                duration: 2000,
                isClosable: true,
                position: "top",
            });
            return;
        }
        
        setLoading(true);
        
        try {
            const response = await submitQuizAnswers(answers);
            
            if (response.status === 200) {
                toast({
                    title: "Success",
                    description: "Quiz submitted successfully!",
                    status: "success",
                    duration: 2000,
                    isClosable: true,
                    position: "top",
                    onCloseComplete: () => {
                        navigate("/results");
                    },
                });
            } else {
                throw new Error("Failed to submit quiz answers");
            }
        } catch (err) {
            console.error("Quiz submission error:", err);
            toast({
                title: "Error",
                description: "Failed to submit quiz answers",
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
                        Quiz
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
                            {questions.map((question) => (
                                <Box mb={["1rem", "1.5rem"]} key={question._id}>
                                    <Text mb="0.5rem" fontSize={["1.1rem", "1.2rem"]}>
                                        {question.question}
                                    </Text>
                                    <Box bg="#ffffff" borderRadius="0.4rem">
                                        <RadioGroup
                                            onChange={(value) =>
                                                handleAnswerChange(question._id, value)
                                            }
                                            value={answers[question._id] || ""}
                                        >
                                            <Stack>
                                                {question.options.map((option) => (
                                                    <Radio value={option} key={option}>
                                                        {option}
                                                    </Radio>
                                                ))}
                                            </Stack>
                                        </RadioGroup>
                                    </Box>
                                </Box>
                            ))}
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
