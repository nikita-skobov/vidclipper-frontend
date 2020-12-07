import React, { useState } from 'react';

export function get_progress_state(stages) {
    const percent_per_stage = 100.0 / stages.length
    let display_percent = 0
    let is_errored = false

    for (let i = 0; i < stages.length; i += 1) {
        const stage = stages[i]
        display_percent += (stage.percent / 100.0) * percent_per_stage

        if (stage.errored != null) {
            is_errored = true
        }

        // if we reach a stage that is currently in progress
        // then every stage after it will have progress percent 0
        // so no point in iterating any more
        if (stage.currently_processing) {
            break
        }
    }
    return [display_percent, is_errored]
}

export function ProgressItem(props) {
    const { data } = props
    const {
        stages,
        key,
        progress,
        is_errored,
    } = data
    console.log('I am progress item, here is data:')
    console.log(data)

    let color = 'white'
    let progress_color = 'bg-info'
    if (is_errored) {
        progress_color = 'bg-danger'
        color = '#ff7272'
    }

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
                    color: color,
                    fontSize: '14px',
                }}
            >
                {key}
            </span>
            <div
                class={`progress-bar ${progress_color}`}
                style={{width: `${progress}%`}}
                role="progressbar"
                aria-valuenow={progress}
                aria-valuemin="0"
                aria-valuemax="100"
            />
        </div>
    );
}
