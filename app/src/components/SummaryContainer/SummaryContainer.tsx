import './SummaryContainer.css';

interface SummaryContainerProps {
    summaries: string[];
}

const SummaryContainer = ({ summaries }: SummaryContainerProps) => {
    return (
        <div className="summaries-container">
            {summaries.map((summary, index) => (
                <div key={index} className="summary-item">
                    <p>{summary}</p>
                </div>
            ))}
        </div>
    );
};

export default SummaryContainer