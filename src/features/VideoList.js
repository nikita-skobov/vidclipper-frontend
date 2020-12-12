import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from 'reactstrap'
import { VideoItem } from './VideoItem'

export function VideoList(props) {
    const { data } = props

    return (
        <Container>
            <Row xs="3">
                {data.map(d => (
                    <Col>
                        <VideoItem data={d} />
                    </Col>
                ))}
            </Row>
        </Container>
    )
}
