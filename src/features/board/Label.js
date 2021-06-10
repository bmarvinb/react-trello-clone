import { Icon } from 'antd';
import React from 'react';
import styled from 'styled-components';

export const Label = ({ color, text, active, onClick, card, listKey, small }) => (
    <LabelWrapper
        className={`card-label-${color}`}
        onClick={event => onClick(listKey, card.key, { ...card, label: text })}
        small={small}
    >
        {text && <span>{text}</span>}
        {active && <Icon type="check" />}
    </LabelWrapper>
);

const LabelWrapper = styled.div`
    cursor: pointer;
    box-sizing: border-box;
    display: inline-block;
    color: white;
    border-radius: 3px;
    font-weight: 600;
    height: 32px;
    text-align: center;
    min-width: ${props => (props.small ? '30px' : '40px')};
    line-height: ${props => (props.small ? '16px' : '32px')};
    font-size: ${props => (props.small ? '10px' : '12px')};
    height: ${props => (props.small ? '16px!important' : '32px')};
    margin: ${props => (props.small ? '0' : '0 4px 4px 0')};
    padding: ${props => (props.small ? '0 3px' : '0 12px')};
    i {
        margin-left: 5px;
    }
`;
