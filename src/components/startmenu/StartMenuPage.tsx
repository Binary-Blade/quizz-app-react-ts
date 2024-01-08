import {Title} from "./Title.tsx";
import {ButtonQuiz} from "../buttons/ButtonQuiz.tsx";
import {useDataStore} from "../../store/dataStore.tsx";


enum StartTitle {
    content = "Welcome to the",
    contentBold = "Frontend Quiz!"
}
enum EndTitle {
    content = "Quiz completed",
    contentBold = 'You scored...'
}

export const StartMenuPage = () => {
    const statut = false;
    const {quizzes} = useDataStore();
    const backgroundColorIcon = ['#FFF1E9', '#E0FDEF','#EBF0FF','#F6E7FF']
    return (
        <>
            <div className={'flex flex-col gap-10 pt-4 m-2'}>
            {!statut ?
                <Title content={StartTitle.content} contentBold={StartTitle.contentBold}/>
                :
                <Title content={EndTitle.content} contentBold={EndTitle.contentBold}/> }

            <div className={"flex flex-col justify-center"}>
                {quizzes.map((quiz, index) => (
                    <ButtonQuiz
                        icon={quiz.icon}
                        key={index}
                        titleSubject={quiz.title}
                        backgroundColor={backgroundColorIcon[index % backgroundColorIcon.length]}
                    />
                ))}

            </div>
            </div>
        </>
    );
};