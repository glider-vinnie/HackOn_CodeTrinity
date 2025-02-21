import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Timer, AlertCircle } from 'lucide-react';
import type { Question } from '../types';

const QUIZ_TIME_LIMIT = 105; // seconds

interface QuizProps {
  continent: string;
}

export function Quiz({ continent }: QuizProps) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(QUIZ_TIME_LIMIT);
  const [startTime] = useState(Date.now());
  const navigate = useNavigate();

  useEffect(() => {
    // In a real app, fetch questions from Supabase
    // This is mock data for demonstration
    setQuestions([
      {
        id: 1,
        continent,
        question: `What is the largest country in ${continent}?`,
        options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
        correct_answer: 'Option 1'
      },
      // ... more questions
    ]);
  }, [continent]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleQuizEnd();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleAnswer = (answer: string) => {
    if (answer === questions[currentQuestion].correct_answer) {
      setScore(score + 1);
    }

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      handleQuizEnd();
    }
  };

  const handleQuizEnd = async () => {
    const timeTaken = Math.round((Date.now() - startTime) / 1000);
    
    const { data: { user } } = await supabase.auth.getUser();
    
    if (user) {
      await supabase.from('quiz_results').insert({
        user_id: user.id,
        continent,
        score,
        time_taken: timeTaken
      });
    }

    navigate('/leaderboard');
  };

  if (questions.length === 0) return <div>Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-6 flex justify-between items-center">
        <div className="text-lg font-semibold">
          Question {currentQuestion + 1}/{questions.length}
        </div>
        <div className="flex items-center gap-2 text-red-600">
          <Timer size={20} />
          <span>{timeLeft}s</span>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4">{questions[currentQuestion].question}</h2>
        <div className="grid gap-4">
          {questions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(option)}
              className="w-full text-left p-4 rounded-lg border border-gray-200 hover:bg-blue-50 transition-colors"
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {timeLeft < 30 && (
        <div className="mt-4 flex items-center gap-2 text-red-600">
          <AlertCircle size={20} />
          <span>Hurry up! Less than 30 seconds remaining!</span>
        </div>
      )}
    </div>
  );
}