import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { ProgressItem } from './ProgressItem'

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

    return data.map(d => <ProgressItem data={d} />)
}
