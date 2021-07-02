import { AppBar, Toolbar, Typography } from "@material-ui/core"

const Header = ({ classes }) => {
    return (
        <AppBar position="static" style={{ backgroundColor: '#f14e32', margin: '0'}}>
            <Toolbar>
                <Typography variant="h6" className={classes.title}>
                Git Tracker
                </Typography>
            </Toolbar>
        </AppBar>
    )
}

export default Header
