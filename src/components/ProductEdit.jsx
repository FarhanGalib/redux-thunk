import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Button, Container, TextField, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SaveIcon from "@material-ui/icons/Save";
import BackDrop from "@material-ui/core/backdrop";
import CircularProgress from "@material-ui/core/circularProgress";
import { requestCurrentProduct } from "../Redux/actions/productDetailsAction";
import { requestUpdate } from "../Redux/actions/productDetailsAction";
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
    txtField: {
        marginTop: 15,
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
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
    },
}));

const ProductEdit = () => {
    const classes = useStyles();
    const [selectedProduct, setSelectedProduct] = useState();
    const [open, setOpen] = useState(true);
    const history = useHistory();
    const { id } = useParams();
    const dispatch = useDispatch();
    const { currentProduct } = useSelector(
        (state) => state.productDetailsReducer
    );

    useEffect(() => {
        dispatch(requestCurrentProduct(id));
        setSelectedProduct(currentProduct);
        setOpen(false);
    }, []);

    useEffect(() => {
        setSelectedProduct(currentProduct);
     
    }, [currentProduct]);

    const addProduct = (e, key) => {
        setSelectedProduct({ ...selectedProduct, [key]: e.target.value });
    };

    const requestUpdateProduct = () => {
        dispatch(requestUpdate(selectedProduct, id));
        history.push(`/product/${id}`);
    };
    return (
        <>
            {open ? (
                <BackDrop open={open} className={classes.backdrop}>
                    <CircularProgress color="primary"></CircularProgress>
                </BackDrop>
            ) : (
                <Container>
                    <Typography variant="h4" className={classes.heading}>
                        Edit <span className={classes.headingStyle2}>Pro</span>
                        duct
                    </Typography>
                    <TextField
                        required
                        fullWidth
                        variant="outlined"
                        label="Product Title"
                        type="text"
                        value={selectedProduct?.title}
                        onChange={(e) => addProduct(e, "title")}
                        className={classes.txtField}
                    />

                    <TextField
                        required
                        fullWidth
                        variant="outlined"
                        label="Product Category"
                        type="text"
                        value={selectedProduct?.category}
                        onChange={(e) => addProduct(e, "category")}
                        className={classes.txtField}
                    />

                    <TextField
                        required
                        fullWidth
                        variant="outlined"
                        label="Product Description"
                        multiline
                        rows={3}
                        type="text"
                        value={selectedProduct?.description}
                        onChange={(e) => addProduct(e, "description")}
                        className={classes.txtField}
                    />

                    <TextField
                        required
                        fullWidth
                        variant="outlined"
                        label="Product Price"
                        value={selectedProduct?.price}
                        onChange={(e) => addProduct(e, "price")}
                        className={classes.txtField}
                    />

                    <TextField
                        required
                        fullWidth
                        variant="outlined"
                        label="Product Image Link"
                        type="text"
                        value={selectedProduct?.image}
                        onChange={(e) => addProduct(e, "image")}
                        className={classes.txtField}
                    />

                    <Button
                        startIcon={<SaveIcon />}
                        variant="contained"
                        color="primary"
                        onClick={() => requestUpdateProduct()}
                    >
                        Save
                    </Button>
                </Container>
            )}
        </>
    );
};

export default ProductEdit;
