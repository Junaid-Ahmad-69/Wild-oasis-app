import {Select} from "./Select.jsx";
import {useSearchParams} from "react-router-dom";

export const SortBy = ({options}) => {
    const [searchParams, setSearchParams] = useSearchParams()
    function handleChange(e) {
        searchParams.set("sortBy", e.target.value)
        setSearchParams(searchParams)
    }

    const sortBy = searchParams.get("sortBy") || "";


    return (
        <>
            <Select options={options} type="white" value={sortBy} onChange={handleChange}/>
        </>
    )
}
