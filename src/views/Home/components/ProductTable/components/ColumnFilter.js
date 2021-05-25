export default function ColumnFilter({ column }) {

    const { filterValue, setFilter } = column;

    return (
        <span >
            <input value={filterValue || ''} onChange={e => setFilter(e.target.value)} style={{width: '150px'}}/>
        </span>
    );
}