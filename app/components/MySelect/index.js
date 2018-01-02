import React from "react";
import Select from "react-select";
import styled from 'styled-components';

const MySelect = styled(Select)`

  &.Select--multi {
    .Select-control, Select-input {
      background: #f8f8f8;
    }
  }

	&.Select--multi  {
		.Select-value {
			display: inline-flex;
      align-items: center;
      background: #f8f8f8;
		}		
	}


	& .Select-control {
      background: #f8f8f8;
  }

	& .Select-control:focus {
      background: #f8f8f8;
  }

	& div.Select-placeholder {

      background: #f8f8f8;
  }
	& .Select-placeholder {
		font-size: smaller;
	}
`

export default (props) => <MySelect {...props} />