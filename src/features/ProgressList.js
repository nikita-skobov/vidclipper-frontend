import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { ProgressItem, get_progress_state } from './ProgressItem'

async function get_progress_list() {
    try {
        const result = await axios.post('http://localhost:4000/get')
        console.log(result)
        const new_data = []
        let keys = Object.keys(result.data)
        keys.forEach((key) => {
            const obj = result.data[key]
            new_data.push({
                key,
                stages: obj,
            })
        })
        return { data: new_data, success: true }
    } catch {
        return { data: [], success: false }
    }
}

export function ProgressList() {
    const [data, setData] = useState([]);
    console.log(`list wrapper has data: ${data}`)

    useEffect(() => {
        const dothing = () => {
            get_progress_list().then(({ data, success }) => {
                console.log('got progress list:')
                console.log(data)
                console.log(success)
                // TODO: set flag whether or not there was error
                setData(data)
                setTimeout(() => {
                    console.log('done interval. do thing again')
                    dothing()
                }, 2000)
            })
        }
        dothing()
    }, [])

    // sort the progress map so the highest progress comes first
    // to do that we need to calculate the progresses for each data:
    for (let i = 0; i < data.length; i += 1) {
        const stages = data[i].stages
        const [progress, is_errored] = get_progress_state(stages)
        data[i].progress = progress
        data[i].is_errored = is_errored
    }
    // first sort alphabetically
    // this avoids things at 100% from constantly moving around
    data.sort((a, b) => {
        return a.key > b.key ? -1 : 1
    })
    // then sort by progress
    data.sort((a, b) => {
        return a.progress > b.progress ? -1 : 1
    })

    return data.map(d => <ProgressItem data={d} />)
}
