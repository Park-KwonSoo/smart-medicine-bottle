import React from 'react';

import  * as styled from './ManagerMenuStyled';


// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ManagerMenuProps {}

const ManagerMenuPresenter = (props : ManagerMenuProps) => {
    return (
        <styled.Container>
            관리자 메뉴
        </styled.Container>
    )
};

export default ManagerMenuPresenter;