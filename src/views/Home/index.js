import AddProduct from "./components/AddProduct";
import ProductTable from "./components/ProductTable";
import { columns } from "./components/assets/columns";
import React, { useEffect, useState } from "react";
import { database } from "../../firebase/firebaseconf";
import RemoveProduct from "./components/RemoveProduct";
import ModifyProduct from "./components/ModifyProduct";
import { Container, Row, Col, Navbar } from 'react-bootstrap';
import './index.css';
import ToPDF from "./components/ToPDF";

const Home = () => {

    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedProducts, setSelectedProducts] = useState([]);

    useEffect(() => {
        const getProducts = async () => {
            setIsLoading(true)
            const { docs } = await database.collection("productos").orderBy("creationDate", "asc").get()
            const nuevoArray = docs.map( item => ({id: item.id, ...item.data()}))
            setProducts(nuevoArray)
            setIsLoading(false)
        }
        getProducts()
    }, []);

    return (
        <div>
            <Navbar bg='dark'>
                <Container>
                <h1>Lista de productos</h1>
                </Container>
            </Navbar>
            <Container>
                <Row>
                    <Col>
                        
                        <div>
                            <Row
                            className='text-center'
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                            }}
                            >
                                <Col md='auto' lg='true' className='mt-3'>
                                    <ToPDF 
                                    datos={products} 
                                    headers={['Nombre', 
                                    'Cant. de bolsas p/paquete', 
                                    'Precio de costo', 
                                    'Precio 50%',
                                    'Precio 40%',
                                    'Precio 30%',
                                    ]}/>
                                </Col>
                                <Col md='auto' lg='true' className='mt-3'>
                                    <AddProduct setProducts={setProducts} />
                                </Col>
                                <Col md='auto' lg='true' className='mt-3'>
                                    <RemoveProduct selectedProducts={selectedProducts} setProducts={setProducts}/>
                                </Col>
                                <Col md='auto' lg='true' className='mt-3'>
                                    <ModifyProduct selectedProducts={selectedProducts} setProducts={setProducts}/>
                                </Col>
                            </Row>
                            <ProductTable columnas={columns} datos={products} isLoading={isLoading} setSelectedProducts={setSelectedProducts}/>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Home;