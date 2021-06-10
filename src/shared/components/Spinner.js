import { Button } from 'antd';
import React from 'react';
import styled from 'styled-components';

const Loading = styled.div`
    text-align: center;
`;

export const Spinner = () => (
    <Loading>
        <Button shape="circle" loading />
    </Loading>
);
