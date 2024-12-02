import "../styles/Loading.css"

function Loading() {
    return (
        <div className="loading-container">
            <div className="animation-container">
                <div className="line-bg"></div>
                <div className="line-fill"></div>
            </div>
        </div>
    )
}

export default Loading