import { React, useState } from "react";
import TextField from "@mui/material/TextField";

function SearchBar() {
    const [searchText, setSearchText] = useState("");

    function searchHandler(e){
        var lowerCase = e.target.value.toLowerCase();
        setSearchText(lowerCase);
        console.log(searchText);
    };

    return (
        <div>
            <div className="search">
                <TextField
                    id="outlined-basic"
                    variant="outlined"
                    fullWidth
                    label="Search"
                    onChange={searchHandler}
                />
            </div>
        </div>
    )
}

export default SearchBar;