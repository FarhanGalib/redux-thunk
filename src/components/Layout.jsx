import Typography from "@material-ui/core/Typography";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import AppBar from "@material-ui/core/AppBar";
import { makeStyles, alpha } from "@material-ui/core/styles";
import HomeIcon from "@material-ui/icons/Home";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Toolbar, InputBase, Avatar } from "@material-ui/core";
import { format } from "date-fns";
import SearchIcon from "@material-ui/icons/Search";
import { setSearchText } from "../Redux/actions/searchProductAction";
import { useDispatch, useSelector } from "react-redux";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { IconButton } from "@material-ui/core";
import { Menu, MenuItem } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';



const drawerWidth = 240;
//css
const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexGrow: 1,
    },
    page: {
        backgroundColor: "#f3f3f3",
        width: "100%",
    },
    drawer: {
        width: drawerWidth,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    active: {
        backgroundColor: "#f1f1f1",
    },
    item: {
        "&:hover": {
            cursor: "pointer",
            backgroundColor: "#f8f8f8",
        },
    },
    title: {
        padding: theme.spacing(2),
    },
    appbar: {
        width: `calc(100% - ${drawerWidth}px)`,
    },
    toolbar: theme.mixins.toolbar,

    date: {
        flexGrow: 1,
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("sm")]: {
            width: "12ch",
            "&:focus": {
                width: "20ch",
            },
        },
    },

    search: {
        position: "relative",
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        "&:hover": {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: "100%",
        [theme.breakpoints.up("sm")]: {
            marginLeft: theme.spacing(1),
            width: "auto",
        },
    },

    searchIcon: {
        padding: theme.spacing(0, 2),
        height: "100%",
        position: "absolute",
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    inputRoot: {
        color: "inherit",
    },
}));

// layout component
const Layout = ({ children }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const classes = useStyles();
    const location = useLocation();
    const history = useHistory();
    const dispatch = useDispatch();
    const { searchText } = useSelector(
        (state) => state.searchReducer
    );

    const menuItem = [
        {
            text: "Home",
            icon: <HomeIcon color="primary" />,
            path: "/",
        },
        {
            text: "Add Product",
            icon: <AddCircleOutlineIcon color="primary" />,
            path: "/create-product",
        },
        {
            text: "Orders",
            icon: <ShoppingCartIcon color="primary" />,
            path: "/orders",
        },
        {
            text: "Add Admin",
            icon: <AddIcon color="primary" />,
            path: "/add-admin",
        },
        {
            text: "Users",
            icon: <PeopleAltIcon color="primary" />,
            path: "/users",
        },
    ];

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <div className={classes.root}>
                {/* appbar */}
                <AppBar className={classes.appbar}>
                    <Toolbar>
                        <Typography size="small" className={classes.date}>
                            {format(new Date(), `do, MMM, Y | cccc hh:mm a`)}
                        </Typography>
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon/>
                            </div>
                            <InputBase
                                placeholder="Search…"
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                inputProps={{ "aria-label": "search" }}
                                onChange={(e) =>
                                    dispatch(setSearchText(e.target.value))
                                }
                                value={searchText}
                            />
                        </div>
                        <IconButton onClick={handleProfileMenuOpen}>
                            <Avatar
                                alt="Farhan"
                                src="/profile.PNG"
                            />
                        </IconButton>
                        <Menu
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "center",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "center",
                            }}
                            open={Boolean(anchorEl)}
                            onClose={handleMenuClose}
                        >
                            <MenuItem onClick={handleMenuClose}>
                                My Profile
                            </MenuItem>
                            <MenuItem onClick={handleMenuClose}>
                                Logout
                            </MenuItem>
                        </Menu>
                    </Toolbar>
                </AppBar>

                {/* Drawer */}
                <Drawer
                    className={classes.drawer}
                    variant="permanent"
                    anchor="left"
                    classes={{ paper: classes.drawerPaper }}
                >
                    <div>
                        <Typography
                            className={classes.title}
                            variant="h5"
                            color="textSecondary"
                        >
                            Dashboard
                        </Typography>
                    </div>
                    <List>
                        {menuItem.map((item) => (
                            <ListItem
                                key={item.text}
                                className={`${classes.item} ${
                                    location.pathname === item.path
                                        ? classes.active
                                        : null
                                }`}
                                onClick={() => history.push(item.path)}
                                divider={true}
                            >
                                <ListItemIcon> {item.icon} </ListItemIcon>
                                <ListItemText
                                    primary={item.text}
                                ></ListItemText>
                            </ListItem>
                        ))}
                    </List>
                </Drawer>

                {/* contant */}
                <div className={classes.page}>
                    <div className={classes.toolbar}></div>
                    {children}
                </div>
            </div>
            }
        </div>
    );
};

export default Layout;
