import React, {useState} from "react";
import { useDispatch } from "react-redux";
import { searchDog } from "../actions";
export default function SearchBar() {

    const [search, setSearch] = useState("");

    const dispatch = useDispatch();
    // async await me trae el estado actualizado, si no me trae "Houn" en vez de "Hound"
    const handleChange = async(e) => {
        await setSearch(e.target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(searchDog(search));
        setSearch("");
    }

    return (
        <div>
            <form>
                <input type="text" placeholder="Insert a breed..." value={search} onChange={(e) => handleChange(e)} />
                <button type="submit" onClick={(e) => handleSubmit(e)}>Search</button>
            </form>
        </div>
    )

}

module.export = SearchBar;