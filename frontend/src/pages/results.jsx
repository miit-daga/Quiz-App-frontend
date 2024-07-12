import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Center, Text, Heading, Button, VStack } from '@chakra-ui/react';
import Navbar from '../components/navbar';

const Results = () => {
    const [loading, setLoading] = useState(true);
    const [score, setScore] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchQuizScore = async () => {
            try {
                const response = await axios.get(`https://quiz-app-backend-5ua4.onrender.com/quiz/score`, {
                    withCredentials: true,
                });
                setScore(response.data.score);
            } catch (error) {
                console.error('Failed to fetch quiz score:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchQuizScore();
    }, []);

    const handleReturnHome = () => {
        navigate("/home");
    };

    if (loading) {
        return (
            <>
                <Navbar />
                <Center mt="4">
                    <Text fontSize="xl">Loading...</Text>
                </Center>
            </>
        );
    }

    return (
        <>
            <Navbar />
            <Center mt="4">
                <Heading as="h1" size="xl" mb="4">
                    Quiz Results
                </Heading>
            </Center>
            <Center mt="2">
                <Text fontSize="2xl">You scored {score}</Text>
            </Center>
            <Center mt="4">
                <Button
                    onClick={handleReturnHome}
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
