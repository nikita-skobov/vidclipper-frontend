import React, { useState, useEffect } from 'react'
import { Card, CardBody, Button, CardTitle, CardText, CardImg } from 'reactstrap'
import missing_thumbnail from '../missing_thumbnail.jpeg'

export function VideoItem(props) {
    const { data, onClick } = props

    let {
        title,
        description,
        thumbnail_data,
    } = data

    if (!title) title = ""
    if (!description) description = ""
    if (!thumbnail_data) thumbnail_data = missing_thumbnail

    return (
        <div className="videoitembutton" onClick={onClick}>
            <Card>
                <CardImg width="100%" src={thumbnail_data} alt="reeee" />
                <CardBody>
                    <CardTitle tag="h5">{title}</CardTitle>
                </CardBody>
            </Card>
        </div>
    )
}
