import {useState} from "react"; 

// 이거 클로저!
export default defaultValue => {
    const [value, setValue] = useState(defaultValue);

    const onChange = e => {
        const { target: {value} } = e; // const value = e.target.value; 와 같음.
        setValue(value);
    }; 
    
    return { value, onChange };
}