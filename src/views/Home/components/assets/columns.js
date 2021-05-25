export const columns = [
    {
        Header: 'Nombre',
        accessor: 'productName',
    },
    {
        Header: 'Cant. de bolsas p/paquete',
        accessor: 'bagsAmount',
        disableFilters: true
    },
    {
        Header: 'Precio de costo',
        accessor: 'costPrice',
        disableFilters: true
    },
    {
        Header: 'Precio 50%',
        accessor: 'price50',
        disableFilters: true
    },
    {
        Header: 'Precio 40%',
        accessor: 'price40',
        disableFilters: true
    },
    {
        Header: 'Precio 30%',
        accessor: 'price30',
        disableFilters: true
    },
    {
        Header: 'Precio 50% ligado al blue',
        accessor: 'precioBlue',
        disableFilters: true
    }
]