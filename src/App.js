import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Products from "./components/Products";
import ProductDetails from "./components/ProductDetails";
import ProductEdit from "./components/ProductEdit";
import CreateProduct from "./components/CreateProduct";
import NotFound from "./components/NotFound";
import Layout from "./components/Layout";
import Orders from "./components/Orders";
import AddAdmin from "./components/AddAdmin";
import Users from "./components/Users";

function App() {
    return (
        <div >
            <Router>
             
                <Layout>
                    <Switch>
                        <Route exact path="/">
                            <Products></Products>
                        </Route>
                        <Route exact path="/products">
                            <Products></Products>
                        </Route>
                        <Route exact path="/product/:id">
                            <ProductDetails></ProductDetails>
                        </Route>
                        <Route exact path="/product/edit/:id">
                            <ProductEdit></ProductEdit>
                        </Route>
                        <Route exact path="/create-product">
                            <CreateProduct></CreateProduct>
                        </Route>
                        <Route exact path="/orders">
                            <Orders></Orders>
                        </Route>
                        <Route exact path="/add-admin">
                            <AddAdmin></AddAdmin>
                        </Route>
                        <Route exact path="/users">
                            <Users></Users>
                        </Route>
                        <Route path="*">
                            <NotFound></NotFound>
                        </Route>
                    </Switch>
                </Layout>
            </Router>
        </div>
    );
}

export default App;
