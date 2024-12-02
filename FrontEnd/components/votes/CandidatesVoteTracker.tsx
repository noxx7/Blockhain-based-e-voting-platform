import React from "react";
import "../../styles/vote-components/VoteStatistic.css"

interface CandidateStatsProps {
    name: string;
    percentage: number;
    votes: number;
    totalVotes: number;
    barColor: string;
}

const CandidateStats: React.FC<CandidateStatsProps> = ({
    name,
    percentage,
    votes,
    barColor
}) => {
    return (
        <div className="voting-statistics__candidate">
            <div className="voting-statistics__candidate-header">
                <p className="voting-statistics__candidate-name">{name}</p>
                <div className="voting-statistics__candidate-stats">
                    <p className="voting-statistics__candidate-percentage">
                        {percentage}%
                    </p>
                </div>
            </div>
            <div className="voting-statistics__progress-bar">
                <div
                    className="voting-statistics__progress-bar-fill"
                    style={{
                        width: `${percentage}%`,
                        backgroundColor: barColor,
                    }}
                ></div>
            </div>
            <p className="voting-statistics__candidate-votes">{votes} votes</p>
        </div>
    );
};

export default CandidateStats;
