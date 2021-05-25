import "./GlobalFilter.css"
export default function GlobalFilter({ filter, setFilter }) {
    return (
        <div className="contenedor-propio-filter">
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text" id="inputGroup-sizing-default">Buscar</span>
                </div>
                <input type="text" className="form-control" aria-label="Default" aria-describedby="Default" value={filter || ''} onChange={e => setFilter(e.target.value)} />
            </div>
        </div>


    );
}