import React, { useState } from 'react'
import axios from 'axios'

async function add_progress_item(json) {
    try {
        const result = await axios.post('http://localhost:4000/download', json)
        console.log(result)
        return true
    } catch {
        return false
    }
}

export class AddItemForm extends React.Component {
    constructor(props) {
        super(props)
        this.form = React.createRef()
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(e) {
        e.preventDefault()
        try {
            const { target } = e
            const { elements } = target
            const [
                url_input,
                name_input,
            ] = elements

            const url = url_input.value
            const name = name_input.value

            const submit_json = { url }
            if (name) {
                submit_json.name = name
            }
            add_progress_item(submit_json)
                .then(resp => {
                    console.log('got response from add progress item')
                    console.log(resp)
                })
        } catch {
            // TODO: add form styling
            // and error displaying
        }
    }

    render() {
        return (
            <form ref={this.form} onSubmit={this.handleSubmit}>
                <div class="form-group">
                    <label for="dl_url">URL</label>
                    <input type="text" class="form-control" id="dl_url" />
                    {/* <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> */}
                </div>
                <div class="form-group">
                    <label for="dl_name">Name</label>
                    <input type="text" class="form-control" id="dl_name" />
                    <small id="dl_name_help" class="form-text text-muted">Optional. leave blank if you want the name to be decided from the content itself.</small>
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        )
    }
}
