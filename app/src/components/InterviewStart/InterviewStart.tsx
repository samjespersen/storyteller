import './InterviewStart.css';
import babyIcon from '../../assets/baby.svg';
import heartIcon from '../../assets/heart.svg';

interface InterviewStartProps {
    onTopicChange: (topic: string) => void;
    onStart: (topic: string) => void;
    loading: boolean;
}

const InterviewStart = ({ onTopicChange, onStart, loading }: InterviewStartProps) => {
    const handleTopicSelect = (selectedTopic: string) => {
        onTopicChange(selectedTopic);
        onStart(selectedTopic);
    };

    return (
        <div className="interview-start">
            <div className="topic-buttons">
                <div className="topic-button-container">
                    <span>My Child</span>
                    <button
                        onClick={() => handleTopicSelect("My child")}
                        disabled={loading}
                        className="topic-button"
                    >
                        <img src={babyIcon} alt="Baby icon" className="button-icon" />
                    </button>
                </div>
                <div className="topic-button-container">
                    <span>My Romantic Partner</span>
                    <button
                        onClick={() => handleTopicSelect("My romantic partner")}
                        disabled={loading}
                        className="topic-button"
                    >
                        <img src={heartIcon} alt="Heart icon" className="button-icon" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default InterviewStart;