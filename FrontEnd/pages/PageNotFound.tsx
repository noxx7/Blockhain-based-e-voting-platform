import "../styles/PageNotFound.css"

function PageNotFound() {
    return (
        <div className="notfound-container">
            <img src="src\assets\background.png" alt="bg" />
            <div className="not-found-text-wrapper">
                <h1 className="code">404</h1>
                <div className="notfound-text-wrapper">
                    <span>Page</span>
                    <span>Not</span>
                    <span>Found</span>
                </div>
            </div>
        </div>
    )
}

export default PageNotFound