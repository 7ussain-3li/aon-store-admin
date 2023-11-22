import "./addBtn.css"
import { FaPlus } from "react-icons/fa";

const AddBtn = () => {
    return (
        <div className="add-btn">
            <FaPlus color="white" size={14}/>
            <button>New Product</button>
        </div>
    );
};

export default AddBtn;