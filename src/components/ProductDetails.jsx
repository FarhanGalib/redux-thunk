import React from "react";
import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import {
    Button,
    Card,
    CardActions,
    CardContent,
    Container,
    Typography,
    Grid,
} from "@material-ui/core";
import {
    makeStyles,
    createTheme,
    ThemeProvider,
} from "@material-ui/core/styles";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import CircularProgress from "@material-ui/core/CircularProgress";
import BackDrop from "@material-ui/core/BackDrop";
import NotFound from "./NotFound";
import { useDispatch, useSelector } from "react-redux";
import { requestCurrentProduct } from "../Redux/actions/productDetailsAction";
import { requestDelete } from "../Redux/actions/productDetailsAction";

const customGridBreakpoints = createTheme({
    breakpoints: {
        values: {
            xm: 0,
            sm: 600,
            md: 1000,
            lg: 1280,
            xl: 1920,
        },
    },
});

const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 500,
        marginTop: 40,
    },
    media: {
        height: 400,
        width: 400,
        padding: 30,
        objectFit: "contain",
    },
    action: {},
    details: {},
    card: {},
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
    },
}));

const ProductDetails = () => {
    const classes = useStyles();
    const history = useHistory();
    const { id } = useParams();
    const [open, setOpen] = useState(true);
    const dispatch = useDispatch();
    const { currentProduct } = useSelector(
        (state) => state.productDetailsReducer
    );
    useEffect(() => {
        dispatch(requestCurrentProduct(id));
        setOpen(false);
    }, []);

    const handleEditProduct = (id) => {
        history.push(`/product/edit/${id}`);
    };

    const handleDeleteProduct = (id) => {
        dispatch(requestDelete(id));
        history.push("/");
    };

    return (
        <>
            {open ? (
                <BackDrop open={open} className={classes.backdrop}>
                    <CircularProgress color="primary"></CircularProgress>
                </BackDrop>
            ) :  (
                <Container className={classes.root}>
                    <ThemeProvider theme={customGridBreakpoints}>
                        <Card className={classes.card}>
                            <Grid container spacing={4}>
                                <Grid item sm={12} md={6}>
                                    <img
                                        src={currentProduct?.image}
                                        className={classes.media}
                                        alt=""
                                    />
                                </Grid>
                                <Grid item sm={12} md={6}>
                                    <CardContent>
                                        <Typography variant="h4" gutterBottom>
                                            {currentProduct?.title}{" "}
                                        </Typography>
                                        <Typography
                                            variant="body1"
                                            gutterBottom
                                        >
                                            Category: {currentProduct?.category}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="textSecondary"
                                            gutterBottom
                                        >
                                            <small>
                                                {currentProduct?.description}
                                            </small>
                                        </Typography>
                                        <Typography variant="h6" gutterBottom>
                                            $ {currentProduct?.price}
                                        </Typography>
                                    </CardContent>
                                    <CardActions className={classes.action}>
                                        <Button
                                            startIcon={<EditIcon />}
                                            variant="contained"
                                            color="primary"
                                            onClick={() =>
                                                handleEditProduct(id)
                                            }
                                        >
                                            Edit
                                        </Button>

                                        <Button
                                            startIcon={<DeleteIcon />}
                                            variant="contained"
                                            color="secondary"
                                            onClick={() =>
                                                handleDeleteProduct(id)
                                            }
                                        >
                                            Delete
                                        </Button>
                                    </CardActions>
                                </Grid>
                            </Grid>
                        </Card>
                    </ThemeProvider>
                </Container>
           
            )}
        </>
    );
};

export default ProductDetails;
