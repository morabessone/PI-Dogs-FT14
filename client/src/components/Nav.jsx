import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import { Order } from "./Order";


export function Nav () {
    return (
        <div>
            <Link to = "/home">
                Home
            </Link>
            <Link to = "/dog">
                Create a dog
            </Link>
            <SearchBar />
            <Order />
        </div>
    )
}

export default Nav;