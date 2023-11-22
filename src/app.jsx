import AddBtn from "./Components/AddBtn/addBtn";
import Container from "./Components/Container/container";
import MainHeader from "./Components/Header/header";
import SearchBox from "./Components/SearchBox/searchBox";
import Space from "./Components/Space/space";
import "./app.css"
import React, { useEffect } from "react";
import { useState } from "react";
import ProductTable from "./Components/Table/table"

const App = () => {
    const [products, setProducts] = useState([]);

    const getProducts = async () => {
        try {
            let resp = await fetch('https://dummyjson.com/products');
            let jsonData = await resp.json()
            setProducts(jsonData.products)
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        getProducts();
    }, []);



    return (
        <div>
            <MainHeader />
            <Space height={45} />
            <Container>
                <div className="search-add">
                    <SearchBox />
                    <AddBtn />
                </div>
                <Space height={45} />
                <ProductTable products={products} />
            </Container>
        </div>
    );
};

export default App;