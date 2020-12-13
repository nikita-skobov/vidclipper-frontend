import React, { useState } from 'react'
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
} from 'reactstrap'
import { VideoItem } from './VideoItem'

export function VideoModal(props) {
    const {
        buttonLabel = '',
        className = '',
        style = {},
        data,
    } = props

    const {
        title,
        description,
        video_data,
    } = data

    const [modal, setModal] = useState(false)

    const toggle = () => setModal(!modal)

    return (
        <div style={style}>
            <VideoItem data={props.data} onClick={toggle} />
            <Modal isOpen={modal} toggle={toggle} className={className}>
            <ModalHeader toggle={toggle}>{title}</ModalHeader>
            <ModalBody>
                <video
                    autoPlay
                    controls
                    src={video_data}
                    style={{
                        margin: 'auto',
                        width: '100%'
                    }}
                />
                <div>{description}</div>
            </ModalBody>
            </Modal>
        </div>
    )
}
