import React, { useState } from 'react'
import axios from 'axios'

async function add_progress_item(json) {
    try {
        console.log(json)
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
                start_input,
                duration_input,
                name_input,
                extension_input,
            ] = elements

            const url = url_input.value
            const name = name_input.value
            const start = start_input.value
            const duration = duration_input.value
            const extension = extension_input.value

            const start_num = Number.parseInt(start)
            const duration_num = Number.parseInt(duration)

            const submit_json = { url }
            if (name) {
                submit_json.name = name
            }
            if (!Number.isNaN(start_num)) {
                submit_json.start = start_num
            }
            if (!Number.isNaN(duration_num)) {
                submit_json.duration = duration_num
            }
            if (extension) {
                submit_json.transcode_extension = extension
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
                </div>
                <div class="form-group">
                    <label for="dl_start">Start position(in seconds)</label>
                    <input type="number" class="form-control" id="dl_start" />
                    <small id="dl_start_help" class="form-text text-muted">Optional. leave blank if you want your clip to start at the beginning.</small>
                </div>
                <div class="form-group">
                    <label for="dl_duration">Duration (in seconds)</label>
                    <input type="number" class="form-control" id="dl_duration" />
                    <small id="dl_duration_help" class="form-text text-muted">Optional. leave blank if you want to only clip a certain duration. Can be combined with "Start" to create clips of any time range.</small>
                </div>
                <div class="form-group">
                    <label for="dl_name">Name</label>
                    <input type="text" class="form-control" id="dl_name" />
                    <small id="dl_name_help" class="form-text text-muted">Optional. leave blank if you want the name to be decided from the content itself.</small>
                </div>
                <div class="form-group">
                    <label for="dl_ext">Extension</label> {/* TODO: make this a dropdown... */}
                    <input type="text" class="form-control" id="dl_ext" />
                    <small id="dl_ext_help" class="form-text text-muted">Optional. leave blank if you want the extension to be the same as the source.</small>
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        )
    }
}
