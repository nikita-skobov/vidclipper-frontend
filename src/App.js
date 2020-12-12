import React, { useState, useEffect } from 'react';
import logo from './logo.svg'
import axios from 'axios'
import { ProgressList } from './features/ProgressList'
import { Header } from './features/Header'
import { VideoList } from './features/VideoList'
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

async function get_source_videos() {
    try {
        const result = await axios.get('http://localhost:4000/videos')
        console.log(result)
        return { data: result.data, success: true }
    } catch {
        return { data: [], success: false }
    }
}

function App() {
    const [source_video_data, set_source_video_data] = useState([])
    const [stage_data, set_stage_data] = useState([])
    const [meta_data, set_meta_data] = useState({
        last_fetched: null,
        last_fetch_ok: true,
    })
    useEffect(() => {
        const progress_list_task = () => {
            get_progress_list().then(({ data, success }) => {
                console.log('got progress list:')
                console.log(data)
                console.log(success)

                if (success) {
                    set_stage_data(data)
                    set_meta_data({
                        last_fetched: new Date(),
                        last_fetch_ok: success,
                    })
                } else {
                    // if failed to get data, only
                    // set the meta data to report a failure
                    // but dont override the previous existing
                    // stage data
                    set_meta_data({
                        last_fetched: new Date(),
                        last_fetch_ok: success,
                    })
                }
                setTimeout(() => {
                    console.log('done interval. do progress_list_task again')
                    progress_list_task()
                }, 2000)
            })
        }

        const source_video_task = () => {
            get_source_videos().then(({ data, success }) => {
                console.log('got source videos!')
                if (success) {
                    set_source_video_data(data)
                }

                setTimeout(() => {
                    console.log('done interval. do source_video_task again')
                    source_video_task()
                }, 10000) // 10 seconds
            })
        }
        source_video_task()
        progress_list_task()
    }, [])


    // all data contains other things like
    // the last fetched time, but all_data.data
    // is the main data that we want to display
    const {
        last_fetched,
        last_fetch_ok,
    } = meta_data
    const data = stage_data
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
            <VideoList data={source_video_data} />
        </div>
    )
}

export default App
