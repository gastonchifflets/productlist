import { useState } from "react";
import { database } from "../../../../firebase/firebaseconf";
import { Modal, Form, Button, Container } from "react-bootstrap";

export default function AddProduct({ setProducts }) {

    const [productName, setProductName] = useState('');
    const [bagsAmount, setBagsAmount] = useState('');
    const [costPrice, setCostPrice] = useState('');
    const [show, setShow] = useState(false);

    const setProduct = async (e) => {
        e.preventDefault();
        const product = {
            productName,
            bagsAmount,
            costPrice,
            price30: (costPrice * 1.3).toFixed(2),
            price40: (costPrice * 1.4).toFixed(2),
            price50: (costPrice * 1.5).toFixed(2),
            precioBlue: 'Proximamente',
            creationDate: new Date()
        }
        try {
            await database.collection('productos').add(product)
            const { docs } = await database.collection("productos").orderBy("creationDate", "asc").get();
            const nuevoArray = docs.map( item => ({id: item.id, ...item.data()}));
            setProducts(nuevoArray);
        } catch(er) {
            console.log(er);
        }
        setProductName('');
        setBagsAmount('');
        setCostPrice('');
        setShow(false);
    }

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    return (
        <div>
            <Button 
            variant='primary' 
            onClick={handleShow}
            >Agregar producto</Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Agregar producto</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form  onSubmit={(e) => setProduct(e)}>
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
                        <Form.Group controlId='formCostPrice'>
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
                            variant='success'
                            type='submit'
                            >Confirmar</Button>
                        </Container>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
}