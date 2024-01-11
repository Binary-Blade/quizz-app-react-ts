import {QuestionQuiz} from "./QuestionQuiz.tsx";
import {ProgressBar} from "./ProgressBar.tsx";
import {InputQuiz} from "./InputQuiz.tsx";
import {ButtonSubmit} from "../Button";
import {useDataStore} from "../../store";
import {FC, FormEvent} from "react";
import {ActionType, InitialState} from "../../hooks/quizReducer.tsx";

type QuizProps = {
    state: InitialState,
    quizIndex: number,
    dispatch: (action: ActionType) => void
}
export const Quiz:FC<QuizProps> = ({state, quizIndex, dispatch}) => {
    const { quizzes } = useDataStore();
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
    return (
        <>
            <div className={`flex flex-col justify-items-center pt-10 
                        md:pt-14
                        xl:flex-row xl:gap-24 xl:pt-24`}>
                <div className={'xl:flex-row xl:w-6/12'}>
                    <QuestionQuiz
                        currentIndexQuestion={state.currentQuestionIndex}
                        quizQuestionLength={quiz.questions.length}
                        quizQuestion={question.question}
                    />
                    <div className={'pt-6 md:pt-10'}>
                        <ProgressBar progress={state.currentQuestionIndex}/>
                    </div>
                </div>
                <form onSubmit={handleNextQuestion} className={`flex flex-col pt-10 
                            md:pt-14 xl:pt-0 xl:w-6/12`}>
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
        </>
    );
};