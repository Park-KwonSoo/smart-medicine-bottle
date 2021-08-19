import React, { useState, useEffect } from "react";
import { RouteComponentProps } from 'react-router-dom';

import { useRecoilValue } from "recoil";
import * as recoilUtil from '../../util/recoilUtil';

import RegisterPresenter from "./RegisterPresenter";

type RegisterProps = RouteComponentProps;

const RegisterContainer = (props : RegisterProps) => {
    return (
        <RegisterPresenter

        />
    )
};

export default RegisterContainer;