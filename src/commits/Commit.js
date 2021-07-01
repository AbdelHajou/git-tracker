const Commit = ({ commit, repo }) => {
    return (
        <div className='commit' key={commit.sha}>
            <span>
                {commit.message.includes('\n\n')
                ? commit.message.substring(0, commit.message.indexOf('\n\n'))
                : commit.message
            }
            </span><br />
            <i>{repo.name}</i>
        </div>
    )
}

export default Commit
