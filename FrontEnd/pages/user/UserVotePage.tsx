/* eslint-disable react-hooks/exhaustive-deps */
import "../../styles/user/UserVote.css";
import candidate1 from "../../assets/candidate1r.jpg"
import candidate2 from "../../assets/candidate2.jpg"
import candidate3 from "../../assets/candidate3.jpg"
import { useEffect, useState } from "react";
import { useDataContext } from "../../context/DataContext";
import VoteProgressBar from "../../components/votes/VoteProggressBar";
import Candidate from "../../components/votes/CandidateVoteComponent";
import { useProgramContext } from "../../context/ProgramContext";
import { setProvider } from "@coral-xyz/anchor";

function UserVotePage() {
    const { authData } = useDataContext()
    const { program, provider, voteAccountAddress, connection } = useProgramContext()
    setProvider(provider)

    const [voteData, setVoteData] = useState({
        c1v: 0,
        c2v: 0,
        c3v: 0,
        c1p: 0,
        c2p: 0,
        c3p: 0,
        totalVotes: 0
    })

    useEffect(() => {
        fetchAndSetVoteDatasFromDevnet()

        connection.onAccountChange(
            voteAccountAddress,
            async () => {
                try {
                    fetchAndSetVoteDatasFromDevnet()
                } catch (error) {
                    console.error("Error fetching vote data:", error);
                }
            }
        )
    }, []);

    const fetchAndSetVoteDatasFromDevnet = async () => {
        const fetchVote = await program.account.voteAccount.fetch(voteAccountAddress)

        const a = Number(JSON.stringify(JSON.parse(fetchVote.budiKurniawanVotes)))
        const b = Number(JSON.stringify(JSON.parse(fetchVote.dewiKartikaVotes)))
        const c = Number(JSON.stringify(JSON.parse(fetchVote.arifPratamaVotes)))

        const totalVotes = a + b + c

        const p1 = Math.round((a / totalVotes) * 100)
        const p2 = Math.round((b / totalVotes) * 100)
        const p3 = Math.round((c / totalVotes) * 100)

        const votes = {
            c1v: a,
            c2v: b,
            c3v: c
        }

        const percentage = {
            c1p: p1,
            c2p: p2,
            c3p: p3
        }

        setVoteData({
            ...votes,
            ...percentage,
            totalVotes
        })
    }

    return (
        <div className="vote-container">
            <div className="vote-header">
                <h1>Cast Your Vote</h1>
            </div>
            <div className="vote-body">
                <div className="candidates-section">
                    <div className="candidate">
                        <Candidate name="Budi Kurniawn" img={candidate1} voted={authData?.voted as boolean} votes={voteData.c1v} votesPercentage={voteData.c1p} id={1} />
                        <VoteProgressBar votes={voteData.c1v} totalVotes={voteData.totalVotes} />
                    </div>

                    <div className="candidate">
                        <Candidate name="Dewi Kartika" img={candidate2} voted={authData?.voted as boolean} votes={voteData.c2v} votesPercentage={voteData.c2p} id={2} />
                        <VoteProgressBar votes={voteData.c2v} totalVotes={voteData.totalVotes} />
                    </div>

                    <div className="candidate">
                        <Candidate name="Arif Pratama" img={candidate3} voted={authData?.voted as boolean} votes={voteData.c3v} votesPercentage={voteData.c3p} id={3} />
                        <VoteProgressBar votes={voteData.c3v} totalVotes={voteData.totalVotes} />
                    </div>
                </div>

                <div className="live-vote-count-section">
                    <div className="live-total-count">
                        <h1 className="number" id="total-vote-number">
                            {voteData.totalVotes}
                        </h1>
                        <span className="total-text">Total Votes</span>
                    </div>

                    <div className="candidate-live-count">
                        <h1 className="candidate-vote-percentage candidate1-percentage">{voteData.c1p}%</h1>
                        <span className="candidate-name">Budi Kurniawan</span>
                    </div>

                    <div className="candidate-live-count">
                        <h1 className="candidate-vote-percentage candidate2-percentage">{voteData.c2p}%</h1>
                        <span className="candidate-name">Dew Kartika</span>
                    </div>


                    <div className="candidate-live-count">
                        <h1 className="candidate-vote-percentage candidate3-percentage">{voteData.c3p}%</h1>
                        <span className="candidate-name">Arif Pratama</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserVotePage;
