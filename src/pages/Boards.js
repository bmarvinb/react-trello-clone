import { Icon } from 'antd';
import { Link } from 'react-router-dom';
import React, { Component } from 'react';

import { CreateBoardModal } from '../features/boards/CreateBoardModal';
import { createBoard, getBoards } from '../core/api/db';
import { Spinner } from '../shared/components/Spinner';
import { isEmpty, mergeDataWithKey } from '../shared/utils';
import { withAuthorization } from '../features/auth/utils/AuthHOC';
import styled from 'styled-components';
import { darken } from 'polished';

class BoardsScreen extends Component {
    state = {
        boards: [],
        isLoading: false,
        modalVisible: false,
    };

    componentDidMount = () => {
        this.setState({
            isLoading: true,
        });
        getBoards()
            .then(snapshot => {
                if (!snapshot.val()) {
                    return;
                }
                this.setState({
                    boards: mergeDataWithKey(snapshot.val()),
                });
            })
            .finally(() => {
                this.setState({
                    isLoading: false,
                });
            });
    };

    handleCreateBoard = board => {
        return createBoard(board).then(response => {
            let updatedBoards = this.state.boards;
            updatedBoards.push(response);
            this.setState({
                boards: updatedBoards,
                modalVisible: false,
            });
        });
    };

    setModalVisible = () => {
        this.setState({ modalVisible: true });
    };

    handleCloseModal = () => {
        this.setState({
            modalVisible: false,
        });
    };

    render() {
        const { isLoading } = this.state;
        const { boards } = this.state;
        const starredBoards = boards.filter(board => board.favorite);

        return isLoading ? (
            <Spinner />
        ) : (
            <Boards>
                {!isEmpty(starredBoards) && (
                    <BoardTypes>
                        <BoardTypeTitle>
                            <Icon type="star" />
                            Starred Boards
                        </BoardTypeTitle>

                        {starredBoards.map((board, index) => {
                            return (
                                <Link to={`b/${board.key}`} key={index}>
                                    <BoardLink title={board.title} color="#0079BF" favorite={board.favorite} />
                                </Link>
                            );
                        })}
                    </BoardTypes>
                )}

                <BoardTypes>
                    <BoardTypeTitle>
                        <Icon type="user" />
                        Personal Boards
                    </BoardTypeTitle>

                    <React.Fragment>
                        {boards.map((board, index) => {
                            return (
                                <Link key={index} to={`b/${board.key}`}>
                                    <BoardLink
                                        key={index}
                                        title={board.title}
                                        color="#0079BF"
                                        favorite={board.favorite}
                                    />
                                </Link>
                            );
                        })}
                        <NewBoard onClick={this.setModalVisible} />
                    </React.Fragment>
                </BoardTypes>

                <CreateBoardModal
                    onCreateBoard={this.handleCreateBoard}
                    onCloseModal={this.handleCloseModal}
                    visible={this.state.modalVisible}
                />
            </Boards>
        );
    }
}

const BoardTypes = styled.div`
    margin-bottom: 10px;
    margin: auto;
`;

const BoardTypeTitle = styled.h4`
    i {
        margin-right: 5px;
        color: gray;
    }
    margin-left: 5px;
    margin-bottom: 0px;
`;

const Boards = styled.div``;

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

const authCondition = authUser => !!authUser;

export const WrapperBoardsScreen = withAuthorization(authCondition)(BoardsScreen);
