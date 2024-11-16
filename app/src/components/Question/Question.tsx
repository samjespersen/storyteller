import './Question.css';

interface QuestionProps {
    question: string;
}

const Question = ({ question }: QuestionProps) => {
    return (
        <div className="qa-pair">
            <div className="question">
                <p className="question-text">{question}</p>
            </div>
        </div>
    );
};

export default Question;