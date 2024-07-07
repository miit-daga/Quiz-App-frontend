import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Center, Text } from "@chakra-ui/react";
import Navbar from "../components/navbar";
import useAuthStore from "../authStore";

const Results = () => {
    const navigate = useNavigate();
    const { quizScore, totalQuestions } = useAuthStore((state) => ({
        quizScore: state.quizScore,
        totalQuestions: state.totalQuestions,
    }));

    const handleReturnHome = () => {
        navigate("/home");
    };

    return (
        <>
            <Navbar />
            <Center mt="6rem">
                <Text fontSize="2xl" fontWeight="bold" mb="2rem">
                    Quiz Results
                </Text>
                <Text mb="1rem">
                    You scored {quizScore} out of {totalQuestions}.
                </Text>
                <Button
                    onClick={handleReturnHome}
                    mt="1rem"
                    colorScheme="blue"
                    variant="solid"
                    size="md"
                >
                    Return to Home
                </Button>
            </Center>
        </>
    );
};

export default Results;
