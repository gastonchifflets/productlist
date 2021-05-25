import { database } from "../../../../firebase/firebaseconf";
import Button from 'react-bootstrap/Button';

export default function RemoveProduct({ selectedProducts, setProducts }) {

    const handleRemove = async () => {
        try {
            await selectedProducts.forEach(product => database.collection('productos').doc(product.original.id).delete());
        } catch(er) {
            console.log(er);
        }
        setTimeout(async () => {
            const { docs } = await database.collection("productos").orderBy("creationDate", "asc").get();
            const nuevoArray = docs.map( item => ({id: item.id, ...item.data()}));
            setProducts(nuevoArray);
        }, 200);
        
    }

    return (
        <Button variant='danger'
        disabled={(selectedProducts.length === 0) ? true : false} 
        onClick={() => handleRemove()} 
        >Eliminar producto/s</Button>
    );
}