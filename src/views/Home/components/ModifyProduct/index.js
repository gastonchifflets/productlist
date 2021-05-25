import { Button, Form, Modal, Container } from "react-bootstrap";
import { useState } from "react";
import { database } from "../../../../firebase/firebaseconf";

export default function ModifyProduct({ selectedProducts, setProducts }) {

    const product = selectedProducts[0]
    const [bagsAmount, setBagsAmount] = useState('');
    const [costPrice, setCostPrice] = useState('');
    const [productName, setProductName] = useState('');
    const [creationDate, setCreationDate] = useState('');
    const [show, setShow] = useState(false);
    
    const getProduct = async (e) => {
        e.preventDefault();
        try {
        const docProduct = await database.collection('productos').doc(product.original.id).get();
        const dataProduct = docProduct.data();
        setCostPrice(dataProduct.costPrice);
        setProductName(dataProduct.productName);
        setBagsAmount(dataProduct.bagsAmount);
        setCreationDate(dataProduct.creationDate);      
        } catch(er) {
            console.log(er);
        }
        setShow(true);
    };

    const handleClose = () => setShow(false);

    const handleModify = async (e) => {
        e.preventDefault()
        const productUpdate = {
            productName,
            bagsAmount,
            costPrice,
            price30: (costPrice * 1.3).toFixed(2),
            price40: (costPrice * 1.4).toFixed(2),
            price50: (costPrice * 1.5).toFixed(2),
            precioBlue: 'Proximamente',
            creationDate: creationDate
        };
        try {
            await database.collection('productos').doc(product.original.id).update(productUpdate);
        } catch(er) {
            console.log(er);
        } finally {
            const { docs } = await database.collection("productos").orderBy("creationDate", "asc").get();
            const nuevoArray = docs.map( item => ({id: item.id, ...item.data()}));
            setProducts(nuevoArray);
        }
        setProductName('');
        setBagsAmount('');
        setCostPrice('');
        setShow(false);
    };

    return (
        <div>
            <Button 
                variant='info'
                disabled={(selectedProducts.length === 1) ? false : true}
                onClick={(e) => getProduct(e)}
                >Modificar producto</Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modificar producto</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form onSubmit={(e) => handleModify(e)}>
                    <Form.Group controlId='formProductName'>
                        <Form.Label>Nombre del producto</Form.Label>
                        <Form.Control 
                        type='text'
                        placeholder='Nombre' 
                        required
                        value={productName} 
                        onChange={(e) => setProductName(e.target.value)} 
                        />
                    </Form.Group>
                    <Form.Group controlId='formBagsAmount'>
                        <Form.Label>Cant. de bolsas p/paquete</Form.Label>
                        <Form.Control 
                        type='number' 
                        required
                        placeholder='Cantidad'
                        value={bagsAmount} 
                        onChange={(e) => setBagsAmount(e.target.value)} 
                        />
                    </Form.Group>
                    <Form.Group  controlId='formCostPrice'>
                        <Form.Label>Precio de costo</Form.Label>
                        <Form.Control 
                        type='number' 
                        required
                        placeholder='Costo'
                        value={costPrice} 
                        onChange={(e) => setCostPrice(e.target.value)} 
                        />
                    </Form.Group>
                    <Container
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                    >
                        <Button 
                        disabled={(selectedProducts.length === 1) ? false : true}
                        type='submit'
                        variant='success'
                        
                        >Confirmar modificación</Button>
                    </Container>
                </Form>
                </Modal.Body>
            </Modal>
        </div>
    )
}