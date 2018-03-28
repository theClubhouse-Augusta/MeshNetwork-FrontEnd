import React from 'react';
import { RingLoader } from 'react-spinners';

export default props =>
    <div className={props.class ? "" : "spinnerMeshNetwork"}>
        <RingLoader
            size={props.size ? props.size : 300}
            color={'#123abc'}
            loading={props.loading}
        />
    </div>