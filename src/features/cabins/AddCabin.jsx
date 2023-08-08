import CreateCabinForm from "./CreateCabinForm.jsx";
import {useState} from "react";
import Button from "../../ui/Button.jsx";
import {Modal} from "../../ui/Modal.jsx";

const AddCabin = () => {
    const [isOpenModal, setIsOpenModal] = useState(false)


    return (
    <div>
        <Button onClick={() => setIsOpenModal(show => !show)}>Add new Cabin</Button>
        {isOpenModal && <Modal onClose={()=>setIsOpenModal(false)}> <CreateCabinForm onClose={()=>setIsOpenModal(false)}/></Modal>}
    </div>
  )
}

export default AddCabin
