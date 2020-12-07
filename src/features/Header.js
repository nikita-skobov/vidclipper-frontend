import React, { useState, useEffect } from 'react';

export function Header(props) {
    const { last_fetched, last_fetch_ok } = props

    let last_fetched_string = ''
    if (last_fetched !== null) {
        last_fetched_string = `Last fetched: ${last_fetched.toString()}`
    }
    let last_fetched_color = 'white'
    if (!last_fetch_ok) {
        last_fetched_color = 'red'
    }

    return (
        <nav class="navbar navbar-dark bg-dark">
            <a class="navbar-brand">Vidclipper</a>
            <span style={{ color: last_fetched_color }}>{last_fetched_string}</span>
        </nav>
    )
}
