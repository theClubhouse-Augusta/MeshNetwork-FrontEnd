import React from 'react';
import { RingLoader } from 'react-spinners';

export default props =>
    <div className="spinnerMeshNetwork">
        <RingLoader
            size={300}
            color={'#123abc'}
            loading={props.loading}
        />
    </div>