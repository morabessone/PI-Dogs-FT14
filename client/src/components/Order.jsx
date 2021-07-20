import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { filterBy, getHeaviest, getLightiest, getTemperaments, orderAZ, orderZA, filter, getDogs } from '../actions';


export function Order() {

    const [selectTemp, setSelectTemp] = useState();
    const [filterTemp, setFilterTemp] = useState([]);

    const dispatch = useDispatch();

    const tempers = useSelector(state => state.allTemps);

    const allTheDogs = useSelector(state => state.allDogs);

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
    
    function handleSelected(e) {
        dispatch(getDogs());
    }

    function orderByHeaviest(e) {
        e.preventDefault();
        dispatch(getHeaviest());
    }

    function orderByLightiest(e) {
        e.preventDefault();
        dispatch(getLightiest());
    }

    useEffect(() => {
        dispatch(getTemperaments());
    }, [])

    function handleChange(e) {
        setSelectTemp(e.target.value);
    }

    function handleClick() {
        let filtering = [];
        allTheDogs?.forEach((e) => {
            if (e.id.length) {
                e.temperaments.map((t) => (
                    t.name === selectTemp ? filtering.push(e) : null
            ))
            } else {
                if (e.temperament?.includes(selectTemp)) {
                    filtering.push(e);
                }
            }
        })
        dispatch(filter(filtering))
    }

    function handleSubmit(e) {
        e.preventDefault();
        setFilterTemp([...filterTemp, selectTemp]);
        handleClick();
    }

    return (
        <div>
            <button onClick={(e) => orderByAz(e)}>A to Z</button>
            <button onClick={(e) => orderByZa(e)}>Z TO A</button>
            <button value="DB" type="submit" onClick={(e) => handleSelect(e)}>DATABASE</button> 
            <button value="ALL" type="submit" onClick={(e) => handleSelected(e)}>ALL</button> 
            <button value="API" type="submit" onClick={(e) => handleSelect(e)}>API</button> 
            <button onClick={(e) => orderByHeaviest(e)}>Weight: + to -</button>
            <button onClick={(e) => orderByLightiest(e)}>Weight: - to +</button>

        <div>
            <form onSubmit={handleSubmit}>
                <label>Filter by temp</label>
                <select onChange={handleChange} name="temperaments" value={selectTemp}>
                    {
                        tempers?.map((t) => {
                            return (
                                <option value={t.name}>{t.name}</option>
                            )
                        })
                    }
                </select>
                <button type="submit">Filter</button>
            </form>
        </div>
    </div>
    )

}

module.export = Order;