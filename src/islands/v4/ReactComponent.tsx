import * as React from 'react'

export default () => {
    const [ time, setTime ] = React.useState(Date.now())

    setInterval(() => {
        setTime(Date.now())
    }, 1000);

    return (
        <>
            <p>hello!</p>
            <p>time: {time}</p>
        </>
    )
}