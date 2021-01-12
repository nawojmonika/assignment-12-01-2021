import React, {useEffect, useState} from "react";
import {ISearchBarProps} from "./interfaces/ISearchBarProps";

function SearchBar({searched, setSearched}: ISearchBarProps) {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearched(event.target.value);
    }

    return (<input value={searched} onChange={handleChange}/>);
}

export default SearchBar;
