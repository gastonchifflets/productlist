

export default function ModifyState({ itemsToModifyState, items }) {
    // No sirve porque no modifica el archivo donde estan los datos
    // const handleModif = (e) => {
    //     itemsToModifyState.forEach(itemToModifyState => {
    //         const index = items.findIndex(item => item.id == itemToModifyState.original.id);
    //         items[index].state = newState;
    //         console.log(items[index])
    //     })
    // }

    // return (
        // <div>
        //     <select id='state'>
        //         <option label='Cancelada' onSelect={setNewState('Cancelada')}>Cancelada</option>
        //         <option label='Finalizada' onClick={setNewState('Finalizada')}>Finalizada</option>
        //         <option label='Pendiente' onClick={setNewState('Pendiente')}>Pendiente</option>
        //     </select>
        //     <button onClick={() => handleModif(itemsToModifyState)} disabled={itemsToModifyState.length === 0}>Cambiar estado</button>
        // </div>
    // );
}