import React, { useState } from 'react';

export function get_progress_percent(stages) {
    const percent_per_stage = 100.0 / stages.length
    let display_percent = 0

    for (let i = 0; i < stages.length; i += 1) {
        const stage = stages[i]
        display_percent += (stage.percent / 100.0) * percent_per_stage

        // if we reach a stage that is currently in progress
        // then every stage after it will have progress percent 0
        // so no point in iterating any more
        if (stage.currently_processing) {
            break
        }
    }
    return display_percent
}

export function ProgressItem(props) {
    const { data } = props
    const { stages, key, progress } = data
    console.log('I am progress item, here is data:')
    console.log(data)

    return (
        <div
            class="progress"
            style={{
                position: 'relative',
                height: '32px',
                backgroundColor: '#5f5f5f',
                borderRadius: '0',
            }}
        >
            <span
                style={{
                    position: 'absolute',
                    textAlign: 'center',
                    width: '100%',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'white',
                    fontSize: '14px',
                }}
            >
                {key}
            </span>
            <div
                class="progress-bar"
                style={{width: `${progress}%`}}
                role="progressbar"
                aria-valuenow={progress}
                aria-valuemin="0"
                aria-valuemax="100"
            />
        </div>
    );
}
