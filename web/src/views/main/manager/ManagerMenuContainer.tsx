import React, { useState, useEffect } from "react";

import { RouteComponentProps} from 'react-router-dom';

import { useRecoilValue } from "recoil";
import * as recoilUtil from '../../../util/recoilUtil';

import ManagerMenuPresenter from "./ManagerMenuPresenter";


type ManagerMenuProps = RouteComponentProps;

const ManagerMenuContainer = (props : ManagerMenuProps) => {
    return (
        <ManagerMenuPresenter

        />
    );
};

export default ManagerMenuContainer;