import './CompletionMessage.css';

interface CompletionMessageProps {
    story?: string
    isLoading?: boolean
}

const CompletionMessage = ({ story, isLoading = false }: CompletionMessageProps) => {
    return (
        <div className="completion-message">
            {isLoading ? (
                <div className="spinner"></div>
            ) : story && (
                <div className="story-section">
                    <h3>Your Story</h3>
                    <p>{story}</p>
                </div>
            )}
        </div>
    )
}

export default CompletionMessage;