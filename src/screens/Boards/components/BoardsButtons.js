import { darken } from 'polished';
import { Icon } from 'antd';
import React from 'react';
import styled from 'styled-components';

export const StyledBoardLink = styled.div`
    position: relative;
    display: inline-block;
    padding: 4px;
    width: 15%;
    height: 80px;
    background-color: ${props => props.color};
    color: white;
    margin: 0.5%;
    border-radius: 4px;
    transition: all 0.3s;
    &:hover {
        background: ${props => darken(0.075, props.color)};
    }
    @media only screen and (max-width: 400px) and (min-width: 82px) {
        width: 96%;
        margin: 2%;
    }
    @media only screen and (max-width: 720px) and (min-width: 400px) {
        width: 48%;
    }
    @media only screen and (max-width: 1024px) and (min-width: 720px) {
        width: 30%;
    }
    @media only screen and (max-width: 1480px) and (min-width: 1024px) {
        width: 20%;
    }
`;

export const StyledNewBoard = styled(StyledBoardLink)`
    color: #6b808c;
    cursor: pointer;
    position: relative;
`;

export const NewBoardContent = styled.div`
    text-align: center;
`;

export const CreateBoardTitle = styled.div`
    top: 25px;
    position: relative;
`;

export const Title = styled.div`
    font-weight: bold;
`;

export const Favorite = styled.div`
    position: absolute;
    bottom: 4px;
    right: 4px;
    transition: all 0.1s;
    color: ${props => (props.favorite ? '#f2d600' : 'white')};
    display: ${props => (props.favorite ? 'block' : 'none')};
`;

export const BoardLink = ({ title, favorite, color }) => (
    <StyledBoardLink color="#0079BF">
        <Title>{title}</Title>
        <Favorite favorite={favorite}>
            <Icon type="star" />
        </Favorite>
    </StyledBoardLink>
);

export const NewBoard = ({ onClick }) => (
    <StyledNewBoard color="#eee" onClick={onClick}>
        <NewBoardContent>
            <CreateBoardTitle>Create new board...</CreateBoardTitle>
        </NewBoardContent>
    </StyledNewBoard>
);
