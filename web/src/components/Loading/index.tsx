import React, { useEffect } from 'react';

import { useRecoilValue } from 'recoil';
import * as recoilItem from '../../util/recoilUtil';

import * as styled from './LoadingStyled';
import Loader from 'react-spinners/BeatLoader'

const LoadingContainer = () => {

    const loading = useRecoilValue(recoilItem.loading);

    return (
       loading ?
       <styled.Container>
           <Loader color = '#337DFF' loading = {loading} size = {20}/>
       </styled.Container> : null
    )
};

export default LoadingContainer;