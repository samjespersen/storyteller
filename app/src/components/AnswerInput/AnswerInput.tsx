import './AnswerInput.css';
interface AnswerInputProps {
    value: string;
    onChange: (value: string) => void;
    onSubmit: () => void;
    loading: boolean;
  }
  
  const AnswerInput = ({ value, onChange, onSubmit, loading }: AnswerInputProps) => {
    return (
      <div className="answer-input">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Type your answer here..."
          rows={4}
        />
        <button
          onClick={onSubmit}
          disabled={!value.trim() || loading}
        >
          Submit Answer
        </button>
      </div>
    );
  };
  
  export default AnswerInput;