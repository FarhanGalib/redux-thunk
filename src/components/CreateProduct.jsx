import React from "react";
import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Container, Grid, TextField, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";

const useStyles = makeStyles({
    txtField: {
        marginTop: 10,
        marginBottom: 10,
        display: "block",
    },
    heading: {
        marginTop: 20,
        marginBottom: 20,
    },
    headingStyle2: {
        color: "orange",
    },
    btn: {
        marginTop: 10,
    },
});

const CreateProduct = () => {
    const classes = useStyles();
    const [newProduct, setNewProduct] = useState({
        title: "",
        category: "",
        description: "",
        price: "",
        image: "",
    });
    const history = useHistory();
    const requestAddProduct = (e) => {
        e.preventDefault();
        axios
            .post("https://fakestoreapi.com/products", {
                title: newProduct.title,
                category: newProduct.category,
                description: newProduct.description,
                price: newProduct.price,
                image: newProduct.image,
            })
            .then((response) => {
                history.push("/");
            });
    };

    const addProduct = (e, key) => {
        setNewProduct({ ...newProduct, [key]: e.target.value });
    };
    return (
        <Container>
            <Typography variant="h4" className={classes.heading}>
                Create <span className={classes.headingStyle2}>Pro</span>
                duct
            </Typography>
            <form type="submit" onSubmit={requestAddProduct}>
                <Grid container>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            variant="outlined"
                            label="Product Title"
                            type="text"
                            value={newProduct.title}
                            onChange={(e) => addProduct(e, "title")}
                            className={classes.txtField}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            variant="outlined"
                            label="Product Category"
                            type="text"
                            value={newProduct.category}
                            onChange={(e) => addProduct(e, "category")}
                            className={classes.txtField}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            variant="outlined"
                            label="Product Description"
                            type="text"
                            multiline
                            rows={3}
                            value={newProduct.description}
                            onChange={(e) => addProduct(e, "description")}
                            className={classes.txtField}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            variant="outlined"
                            label="Product Price"
                            type="text"
                            value={newProduct.price}
                            onChange={(e) => addProduct(e, "price")}
                            className={classes.txtField}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            variant="outlined"
                            label="Product Image Link"
                            type="text"
                            value={newProduct.image}
                            onChange={(e) => addProduct(e, "image")}
                            className={classes.txtField}
                        />
                    </Grid>
                </Grid>
                <Button
                    type='submit'
                    startIcon={<SaveIcon />}
                    variant="contained"
                    color="primary"
                    className={classes.btn}
                    // onClick={() => requestAddProduct()}
                >
                    Add Product
                </Button>
            </form>
        </Container>
    );
};

export default CreateProduct;
