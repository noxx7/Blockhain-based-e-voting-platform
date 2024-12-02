interface VoteProgeressBarProps {
    votes: number
    totalVotes: number
}

const VoteProgressBar: React.FC<VoteProgeressBarProps> = ({ votes, totalVotes }) => {
    const percentage = totalVotes === 0 ? 0 : Math.round((votes / totalVotes) * 100);

    return (
        <div
            className="line-percentage"
            style={{
                backgroundPosition: `${100 - percentage}% 0`,
            }}
        >
            <div className="line-percentage-fill" />
        </div>
    );
};

export default VoteProgressBar