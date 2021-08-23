import {  Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Grid, Card, CardContent, Container } from "@material-ui/core";
import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { CardHeader } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { requestProductList } from "../Redux/actions/productListAction";
import { TextField } from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 5000,
        marginTop: 25,
    },
    media: {
        height: 300,
        width: "100%",
        objectFit: "contain",
    },
    container: {
        marginTop: 20,
    },
    cart: {
        height: "100%",
        "&:hover": {
            cursor: "pointer",
        },
    },
    title: {
        marginTop: 20,
        
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: "#fff",
    },
    sortByCategory:{
        marginLeft: 200,
        marginTop: 10,
    },
}));

const Products = () => {
    const [open, setOpen] = useState(true);
    
    const [productCategory, setProductCategory] = useState("All");
    const history = useHistory();
    const classes = useStyles();
    const dispatch = useDispatch();
    const { productList } = useSelector(
        (state) => state.productListReducer
    );
    const {searchText} = useSelector(state=>state.searchReducer);
    
    useEffect(() => {
        dispatch(requestProductList());
        setOpen(false);
        

    }, []);

    const handleClickOnProduct = (id) => {
        history.push(`/product/${id}`);
    };

    const categories = ["All", "men's clothing", "women's clothing", "jewelery", "electronics"];
    
    return (
        <>
            {open ? (
                <Backdrop className={classes.backdrop} open={open}>
                    <CircularProgress color="primary" />
                </Backdrop>
            ) : (
                <Container>
                    <Grid container>
                        <Grid item xs={12} sm={6}>
                            <Typography
                                variant="h6"
                                color="textSecondary"
                                className={classes.title}
                            >
                                Product-List
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                select
                                
                                value={productCategory}
                                className={classes.sortByCategory}
                                onChange={(e) =>
                                    setProductCategory(e.target.value)
                                }
                                variant="filled"
                                SelectProps={{
                                    native: true,
                                }}
                                helperText="filter product by category"
                            >
                                {categories.map((c) => (
                                    <option key={c} value={c}>
                                        {c}
                                    </option>
                                ))}
                            </TextField>
                           
                        </Grid>
                    </Grid>
                    <Grid container spacing={4} className={classes.container}>
                        
                        { productList.filter((product)=>{
                            if(productCategory==="All") return product;
                            else return product.category===productCategory? product: null;
                        })
                        .filter((product) => {
                                if (searchText === "") return product;
                                else if (
                                    product.title
                                        .toLowerCase()
                                        .includes(searchText.toLowerCase())
                                )
                                    return product;
                            })
                            .map((product) => (
                                <Grid
                                    item
                                    spacing={4}
                                    id={product.id}
                                    className={classes.root}
                                    onClick={() =>
                                        handleClickOnProduct(product.id)
                                    }
                                    xs={12}
                                    sm={6}
                                    md={4}
                                    lg={3}
                                    xl={2}
                                >
                                    <Card className={classes.cart}>
                                        <CardHeader
                                            subheader={product.category}
                                        />
                                        <img
                                            className={classes.media}
                                            src={product.image}
                                            alt=""
                                        />
                                        <CardContent>
                                            <Typography
                                                variant="h6"
                                                gutterBottom
                                            >
                                                {product.title}
                                            </Typography>
                                            <Typography gutterBottom>
                                                ${product.price}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                    </Grid>
                </Container>
            )}
        </>
    );
};

export default Products;
