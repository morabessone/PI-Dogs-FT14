import React from 'react'
import { useDispatch} from 'react-redux'
import { filterBy, getHeaviest, getLightiest, orderAZ, orderZA } from '../actions';


export function Order() {

    const dispatch = useDispatch();

    function orderByAz(e) {
        e.preventDefault();
        dispatch(orderAZ());
    }

    function orderByZa(e) {
        e.preventDefault();
        dispatch(orderZA());
    }

    function handleSelect(e) {
        dispatch(filterBy(e.target.value));
    }
    
    function orderByHeaviest(e) {
        e.preventDefault();
        dispatch(getHeaviest());
    }

    function orderByLightiest(e) {
        e.preventDefault();
        dispatch(getLightiest());
    }

    return (
        <div>
            <button onClick={(e) => orderByAz(e)}>A to Z</button>
            <button onClick={(e) => orderByZa(e)}>Z TO A</button>
            <button value="DB" type="submit" onClick={(e) => handleSelect(e)}>DATABASE</button> 
            <button value="API" type="submit" onClick={(e) => handleSelect(e)}>API</button> 
            <button value="ALL" type="submit" onClick={(e) => handleSelect(e)}>ALL</button> 
            <button onClick={(e) => orderByHeaviest(e)}>Weight: + to -</button>
            <button onClick={(e) => orderByLightiest(e)}>Weight: - to +</button>
        {/* <div>
        <form>
          <label>Source</label>
          <br />
          <select onChange={handleSelect}>
            <option value="''">SELECT</option>
            <option value="ALL">ALL</option>
            <option value="DB">DB</option>
            <option value="API">API</option>
          </select>
        </form>
        </div> */}
    </div>
    )

}

module.export = Order;