import React, { useState } from 'react';

export function ProgressItem(props) {
    const { data } = props
    console.log('I am progress item, here is data:')
    console.log(data)

    const percent_per_stage = 100.0 / data.stages.length
    let display_percent = 0

    for (let i = 0; i < data.stages.length; i += 1) {
        const stage = data.stages[i]
        display_percent += (stage.percent / 100.0) * percent_per_stage

        if (stage.currently_processing) {
            break
        }
    }

    return (
        <div class="progress">
            <div
                class="progress-bar"
                style={{width: `${display_percent}%`}}
                role="progressbar"
                aria-valuenow={display_percent}
                aria-valuemin="0"
                aria-valuemax="100"
            />
        </div>
    );
}
