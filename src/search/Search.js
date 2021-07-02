import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import { FaSearch } from "react-icons/fa"
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 400,
      },
      input: {
        marginLeft: theme.spacing(1),
        flex: 1,
      },
      iconButton: {
        padding: 10,
        color: '#f14e32'
      }
}));

const Search = () => {
    const [searchValue, setSearchValue] = useState('');
    const classes = useStyles();

    const handleChange = (event) => {
        setSearchValue(event.target.value);
    };

    return (
        <Paper component="form" className={classes.root + ' search'}>
            <InputBase
                className={classes.input}
                placeholder="Search Git Tracker"
                inputProps={{ 'aria-label': 'search git tracker' }}
                onChange={handleChange}
                data-testid='search-input'
            />
            <Link data-testid='search-button' to={`/profile/${searchValue}`}>
                <IconButton type="submit" className={classes.iconButton} aria-label="search">
                    <FaSearch />
                </IconButton>
            </Link>
        </Paper>
    )
}

export default Search
