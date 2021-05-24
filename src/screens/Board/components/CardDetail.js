import React from 'react';
import styled from 'styled-components';

export const CardDetail = props => {
    return (
        <CardDetailWrapper>
            <CardDetailHead>
                <CardDetailIcon>{props.icon}</CardDetailIcon>
                <div>{props.title}</div>
            </CardDetailHead>
            <div>{props.content}</div>
        </CardDetailWrapper>
    );
};

const CardDetailWrapper = styled.div`
    width: 100%;
`;

const CardDetailHead = styled.div`
    display: flex;
`;

const CardDetailIcon = styled.div`
    width: 7%;
`;
