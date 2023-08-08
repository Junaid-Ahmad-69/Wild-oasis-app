import {useQuery} from "@tanstack/react-query";
import {getCabins} from "../../services/apiCabins.js";
import Spinner from "../../ui/Spinner.jsx";
import CabinRow from "./CabinRow.jsx";
import Table from "../../ui/Table.jsx";
import Menus from "../../ui/Menus.jsx";
import {useSearchParams} from "react-router-dom";



const CabinTable = () => {
    const {isLoading, data: cabins} =
        useQuery({
            queryKey: ['cabins'],
            queryFn: getCabins,
        })
    const [searchParams] = useSearchParams();
    const filterData = searchParams.get("discount") || "all";

    let filteredCabins;
    if (filterData === "all") filteredCabins = cabins;
    if (filterData === "no-discount") filteredCabins = cabins.filter((cabin => cabin.discount === 0))
    if (filterData === "with-discount") filteredCabins = cabins.filter((cabin => cabin.discount > 0))

    if (isLoading) return <Spinner/>
    return (
        <Menus>
            <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
                <Table.Header>
                    <div></div>
                    <div>Cabin</div>
                    <div>Capacity</div>
                    <div>Price</div>
                    <div>Discount</div>
                    <div></div>
                </Table.Header>
                <Table.Body data={filteredCabins} render={cabin => <CabinRow cabin={cabin} key={cabin.id}/>}/>
            </Table>
        </Menus>
    )
}

export default CabinTable
