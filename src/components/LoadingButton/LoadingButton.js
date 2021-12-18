import React from 'react'
import { Button, Spinner } from 'reactstrap'
const LoadingButton = (props) => {
    return (
        <Button
            onClick={!props.loading && !props.disabled ? props.onClick : null}>
            {props.loading && <Spinner style={{ height: '20px', width: '20px', marginRight: '5px' }} />}
            <span> {props.children}</span>
        </Button>
    )
}

export default LoadingButton