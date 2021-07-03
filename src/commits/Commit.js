import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const Commit = ({ commit, repoName }) => {
    return (
        <ListItem className='commit'>
            <ListItemText
            primary={commit.message.includes('\n\n')
                ? commit.message.substring(0, commit.message.indexOf('\n\n'))
                : commit.message}
            secondary={repoName}
            />
        </ListItem>
    )
}

export default Commit
