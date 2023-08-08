import styled from "styled-components";
import {useState} from "react";

import {formatCurrency} from "../../utils/helpers.js";
import 'react-toastify/dist/ReactToastify.css';
import CreateCabinForm from "./CreateCabinForm.jsx";
import {useDeleteCabin} from "../../hooks/useDeleteCabin.js";
import {useCreateCabin} from "../../hooks/useCreateCabin.js";
import {HiSquare2Stack} from "react-icons/hi2";
import {HiPencil, HiTrash} from "react-icons/hi";
import {Modal} from "../../ui/Modal.jsx";
import ConfirmDelete from "../../ui/ConfirmDelete.jsx";
import Table from "../../ui/Table.jsx";
import Menus from "../../ui/Menus.jsx";

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

const CabinRow = ({cabin}) => {
    const [showForm, setShowForm] = useState(false)
    const [confirmDelete, setConfirmDelete] = useState(false)
    const {isDeleting, deleteCabin} = useDeleteCabin()
    const {isCreating, createCabin} = useCreateCabin()

    const {id: cabinId, image, name, maxCapacity, regularPrice, discount, description} = cabin;

    function handleDuplicate() {
        createCabin({
            name: `Copy of ${name}`,
            image,
            maxCapacity,
            regularPrice,
            discount,
            description
        })
    }

    return (
        <>
            <Table.Row>
                <Img src={image}/>
                <Cabin>{name}</Cabin>
                <div>Fit up to {maxCapacity} guests</div>
                <Price>{formatCurrency(regularPrice)}</Price>
                {discount ? <Discount>{formatCurrency(discount)}</Discount> : <span>&mdash;</span>}
                <div>
                    <Menus.Menu>
                        <Menus.Toggle id={cabinId}/>
                        <Menus.List id={cabinId}>
                            <Menus.Button icon={<HiSquare2Stack/>} disabled={isCreating}
                                          onClick={handleDuplicate}>Duplicate</Menus.Button>
                            <Menus.Button icon={<HiPencil/>}
                                          onClick={() => setShowForm(show => !show)}>Edit</Menus.Button>
                            <Menus.Button icon={<HiTrash/>} onClick={() => setConfirmDelete(true)}>Delete</Menus.Button>
                        </Menus.List>
                    </Menus.Menu>
                    {confirmDelete &&
                        <Modal onClose={() => setConfirmDelete(false)}><ConfirmDelete resourceName="cabibs"
                                                                                      disabled={isDeleting}
                                                                                      onConfirm={() => deleteCabin(cabinId)}
                                                                                      onClose={() => setConfirmDelete(false)}/></Modal>}


                </div>
            </Table.Row>
            {showForm && <Modal onClose={() => setShowForm(false)}> <CreateCabinForm cabinToEdit={cabin}
                                                                                     onClose={() => setShowForm(false)}/></Modal>}
        </>
    )
}

export default CabinRow
