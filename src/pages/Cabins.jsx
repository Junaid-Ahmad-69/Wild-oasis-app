import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CabinTable from "../features/cabins/CabinTable.jsx";
import {useState} from "react";
import CreateCabinForm from "../features/cabins/CreateCabinForm.jsx";
import Button from "../ui/Button.jsx";

function Cabins() {
    const [showForm, setShowForm] = useState(false)
    return (
        <>
            <Row type="horizontal">
                <Heading as="h1">All cabins</Heading>
                <p>TEST</p>
            </Row>
            <Row>
                <CabinTable/>
                <Button onClick={() => setShowForm(show => !show)}>Add new Cabin</Button>
                {showForm && <CreateCabinForm/>}
            </Row>
        </>
    );
}

export default Cabins;
