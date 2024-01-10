import {FC, FormEvent, useEffect, useReducer} from 'react';
import { useDataStore } from '../store/dataStore';
import {InputQuiz} from "../components/Quiz/InputQuiz.tsx";
import {Header} from "../components/Header/Header.tsx";
import {useThemeStore} from "../store/themeStore.tsx";
import {Subject} from "../components/Header/Subject.tsx";
import {ProgressBar} from "../components/Quiz/ProgressBar.tsx";
import {QuestionQuiz} from "../components/Quiz/QuestionQuiz.tsx";
import {ButtonSubmit} from "../components/Button/ButtonSubmit.tsx";
import {quizReducer} from "../hooks/quizReducer.tsx";
import {ScoreFinal} from "../components/Quiz/ScoreFinal.tsx";
import {useParams} from "react-router-dom";



export const QuizPage:FC = () => {
    const params = useParams();
    const quizIndex = params.index ? parseInt(params.index, 10) : 0;

    const [state, dispatch] = useReducer(quizReducer,{
        currentQuestionIndex: 0,
        selectedOption: '',
        isSubmit: false,
        isCorrect: false,
        score: 0
    });

    const backgroundColorIcon: string[] = ['#FFF1E9', '#E0FDEF','#EBF0FF','#F6E7FF'];
    const { quizzes } = useDataStore();
    const {subTextColor} = useThemeStore();
    const quiz = quizzes[quizIndex];
    const question = quiz.questions[state.currentQuestionIndex];

    const handleOptionClick = (option: string) => {
        dispatch({ type: 'SELECT_OPTION', payload: option });
    };

    const handleSubmitAnswer = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const isCorrect = state.selectedOption === question.answer;
        dispatch({ type: 'SUBMIT_ANSWER', payload: isCorrect });
    };

    const handleNextQuestion = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (state.isSubmit && state.currentQuestionIndex < quiz.questions.length - 1 || state.currentQuestionIndex === 9) {
            dispatch({ type: 'NEXT_QUESTION'});
        }
    };

    useEffect(() => {
        dispatch({
            type: 'RESET',
            payload: {
                currentQuestionIndex: 0,
                selectedOption: '',
                isSubmit: false,
                isCorrect: false,
                score: 0
            }
        });
    }, [quizIndex]);


    return (
        <>
            <div className={'flex-col flex justify-center '}>
                <Header>
                    <Subject
                        icon={quiz.icon}
                        title={quiz.title}
                        backgroundColor={backgroundColorIcon[quizIndex % backgroundColorIcon.length]}
                    />
                </Header>
                    {quizzes.length > 0 && state.currentQuestionIndex < 10 ?
                        <div className={'sm:flex flex-col justify-items-center mx-6 pt-14 md:p-10 '}>
                            <QuestionQuiz
                                subTextColor={subTextColor}
                                currentIndexQuestion={state.currentQuestionIndex}
                                quizQuestionLength={quiz.questions.length}
                                quizQuestion={question.question}
                            />
                            <div className={'pt-2'}>
                                <ProgressBar progress={state.currentQuestionIndex}/>
                            </div>
                            <form onSubmit={handleNextQuestion} className={'flex flex-col pt-8'}>
                                <InputQuiz
                                    selectedOption={state.selectedOption}
                                    options={question.options}
                                    isCorrect={state.isCorrect}
                                    isSubmit={state.isSubmit}
                                    onChangeClick={handleOptionClick}
                                />
                                {!state.isSubmit ? <ButtonSubmit
                                    content={'Submit Answer'}
                                    onSubmitClick={handleSubmitAnswer}
                                /> : <ButtonSubmit
                                    content={'Next Question'}
                                />
                                }
                            </form>

                        </div>
                        :
                        <div>
                            <ScoreFinal score={state.score} quizQuestionLength={quiz.questions.length}>
                                <Subject
                                    icon={quiz.icon}
                                    title={quiz.title}
                                    backgroundColor={backgroundColorIcon[quizIndex % backgroundColorIcon.length]}
                                />
                            </ScoreFinal>
                        </div>}
                    </div>
            {!quizzes.length &&
                <div>Loading...</div>}
        </>
    );
};
