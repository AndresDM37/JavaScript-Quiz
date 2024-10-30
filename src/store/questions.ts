import { create } from "zustand";
import { type Question } from "../types.d";
import confetti from "canvas-confetti";
import { persist } from "zustand/middleware";

interface State {
  questions: Question[];
  currentQuestion: number;
  fetchQuestions: (limit: number) => Promise<void>; 
  selectAnswer: (questionId: number, asnwerIndex: number) => void;
  goNextQuestion: () => void;
  goPrevQuestion: () => void;
  reset: () => void;
}

export const useQuestionStore = create<State>()(persist((set, get) => {
  return {
    questions: [],
    currentQuestion: 0,

    fetchQuestions: async (limit: number) => {
      const res = await fetch("http://localhost:5173/data.json");
      const json = await res.json();

      const questions = json.sort(() => Math.random() - 0.5).slice(0, limit);
      set({ questions });
    },

    selectAnswer: (questionId: number, answerIndex: number) => {
      const { questions } = get();
      // structuredClone clona el objeto
      const newQuestions = structuredClone(questions);
      const questionIndex = newQuestions.findIndex((q) => q.id === questionId);
      const questionInfo = newQuestions[questionIndex];

      const isCorrectUserAnswer = questionInfo.correctAnswer === answerIndex;
      if (isCorrectUserAnswer) confetti();

      // actualizar el estado
      newQuestions[questionIndex] = {
        ...questionInfo,
        isCorrectUserAnswer,
        userSelectedAnswer: answerIndex,
      };

      set({ questions: newQuestions });
    },

    goNextQuestion: () => {
      const { currentQuestion, questions } = get();
      const nextQuestion = currentQuestion + 1;

      if (nextQuestion < questions.length) {
        set({ currentQuestion: nextQuestion });
      }
    },

    goPrevQuestion: () => {
      const { currentQuestion } = get();
      const prevQuestion = currentQuestion - 1;

      if (prevQuestion >= 0) {
        set({ currentQuestion: prevQuestion });
      }
    },

    reset: () => {
      set({ questions: [], currentQuestion: 0 });
    }
  };
},{
  name: 'questions'
}));
