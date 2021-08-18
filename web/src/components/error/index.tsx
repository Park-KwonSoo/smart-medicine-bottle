import React, { useEffect } from 'react';
import * as recoilUtil from '../../util/recoilUtil';
import { useRecoilState } from 'recoil';

import * as styled from './ErrorStyled';


const ErrorContainer = () => {

    const [error, setError] = useRecoilState(recoilUtil.error);

    useEffect(() => {
        console.log(error);
    }, [error]);

    return (
        <>
            {
                error ?
                <styled.Container>
                    {error}
                </styled.Container> : null
            }
        </>
    );
}; 

export default ErrorContainer;
