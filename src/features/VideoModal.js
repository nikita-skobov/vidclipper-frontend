import React, { useState } from 'react'
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
} from 'reactstrap'
import { AddItemModal } from './AddItemModal'
import { VideoItem } from './VideoItem'

export function VideoModal(props) {
    const {
        buttonLabel = '',
        className = '',
        style = {},
        data,
    } = props

    const {
        url,
        title,
        description,
        video_data,
    } = data

    const [modal, setModal] = useState(false)

    const get_video_current_time = () => {
        try {
            let video_element = document.getElementById('unique-video-id')
            return Math.floor(video_element.currentTime)
        } catch {
            return 0
        }
    }

    const toggle = () => setModal(!modal)

    return (
        <div style={style}>
            <VideoItem data={props.data} onClick={toggle} />
            <Modal isOpen={modal} toggle={toggle} className={className}>
            <ModalHeader toggle={toggle}>{title}</ModalHeader>
            <ModalBody>
                <video
                    id='unique-video-id'
                    autoPlay
                    controls
                    src={video_data}
                    style={{
                        margin: 'auto',
                        width: '100%'
                    }}
                />
                <AddItemModal
                    getStartTimeCallback={get_video_current_time}
                    defaultUrl={url}
                    style={{ display: 'inline-block' }}
                    buttonLabel="Clip from current timestamp"
                />
                <div>{description}</div>
            </ModalBody>
            </Modal>
        </div>
    )
}
