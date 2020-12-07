import React, { useState } from 'react'
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
} from 'reactstrap'

import { AddItemForm } from './AddItemForm'

export function AddItemModal(props) {
    const {
        buttonLabel = '',
        className = '',
        style = {},
    } = props

    const [modal, setModal] = useState(false)

    const toggle = () => setModal(!modal)

    return (
        <div style={style}>
            <Button color="success" onClick={toggle}>{buttonLabel}</Button>
            <Modal isOpen={modal} toggle={toggle} className={className}>
            <ModalHeader toggle={toggle}>Add Item</ModalHeader>
            <ModalBody>
                <AddItemForm />
            </ModalBody>
            </Modal>
        </div>
    )
}
