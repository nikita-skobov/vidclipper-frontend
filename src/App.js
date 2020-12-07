import React, { useState, useEffect } from 'react';
import logo from './logo.svg'
import axios from 'axios'
import { ProgressList } from './features/ProgressList'
import { Header } from './features/Header'
import { get_progress_state } from './features/ProgressItem'

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

function App() {
    const [all_data, setData] = useState({
        data: [],
        last_fetched: null,
        last_fetch_ok: true,
    });
    console.log(`list wrapper has data: ${all_data}`)
    console.log(all_data)
    useEffect(() => {
        const dothing = () => {
            get_progress_list().then(({ data, success }) => {
                console.log('got progress list:')
                console.log(data)
                console.log(success)

                // TODO: dont set data to empty
                // if there was an error. would be nice to see the
                // old list stay on screen
                setData({
                    data: data,
                    last_fetched: new Date(),
                    last_fetch_ok: success,
                })
                setTimeout(() => {
                    console.log('done interval. do thing again')
                    dothing()
                }, 10000)
            })
        }
        dothing()
    }, [])


    // all data contains other things like
    // the last fetched time, but all_data.data
    // is the main data that we want to display
    const {
        data,
        last_fetched,
        last_fetch_ok,
    } = all_data
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

    return (
        <div className="App">
            <Header last_fetched={last_fetched} last_fetch_ok={last_fetch_ok} />
            <ProgressList data={data} />
        </div>
    )
}

export default App
