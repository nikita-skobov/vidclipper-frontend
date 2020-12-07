import React, { useState, useEffect } from 'react';
import { ProgressItem } from './ProgressItem'

export function ProgressList(props) {
    const { data } = props

    return data.map(d => <ProgressItem data={d} />)
}
