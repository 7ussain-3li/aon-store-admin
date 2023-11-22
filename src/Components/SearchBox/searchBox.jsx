import "./searchBox.css"
import { FiSearch } from "react-icons/fi";

const SearchBox = () => {
    return (
        <div className="search-box">
            <div className="search-icon"><FiSearch color="#a5a5a5"/></div>
            <input placeholder="Find Product ..." />
        </div>
    );
};

export default SearchBox;