import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { List } from 'antd';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

import { BoardTitle } from '../features/board/BoardTitle';
import Cards from '../features/board/Cards';
import {
    doCreateList,
    deleteBoard,
    doDeleteList,
    editBoard,
    updateBoard,
    updateList,
    getBoard,
    onceGetLists,
} from '../core/api/db';
import { FormCreation } from '../features/board/FormCreation';
import { ListHeader } from '../features/board/ListHeader';
import { Spinner } from '../shared/components/Spinner';
import { isEmpty, mergeDataWithKey } from '../shared/utils';
import { withAuthorization } from '../auth/utils/AuthHOC';

class BoardScreen extends Component {
    state = {
        isLoading: false,
        board: {},
        boardKey: '',
        lists: [],
    };

    componentDidMount = () => {
        this.setState({
            isLoading: true,
        });
        const boardKey = this.getBoardKey();
        Promise.all([getBoard(boardKey), onceGetLists(boardKey)])
            .then(snapshots => {
                const board = snapshots[0].val();
                const lists = mergeDataWithKey(snapshots[1].val());
                this.setState(() => ({ boardKey, board, lists }));
            })
            .finally(() =>
                this.setState(() => ({
                    isLoading: false,
                }))
            );
    };

    handleCreateList = listTitle => {
        const { boardKey } = this.state;
        return doCreateList(boardKey, { title: listTitle }).then(response => {
            const lists = [...this.state.lists];
            lists.push(response);
            this.setState({
                lists,
            });
        });
    };

    handleUpdateList = (listKey, title) => {
        const { boardKey } = this.state;
        return updateList(boardKey, listKey, { title }).then(response => {
            const lists = [...this.state.lists];
            lists[lists.findIndex(list => list.key === listKey)] = {
                ...response,
                key: listKey,
            };
            this.setState(() => ({
                lists,
            }));
        });
    };

    handleDeleteList = listKey => {
        const { boardKey } = this.state;
        return doDeleteList(boardKey, listKey).then(() => {
            const lists = this.state.lists.filter(list => list.key !== listKey);
            this.setState({
                lists,
            });
        });
    };

    handleAddToFavorites = () => {
        const { boardKey } = this.state;
        const updatedBoard = { ...this.state.board };
        updatedBoard.favorite = !updatedBoard.favorite;
        return editBoard(boardKey, updatedBoard).then(() => {
            this.setState(() => ({
                board: updatedBoard,
            }));
        });
    };

    handleDeleteBoard = boardKey => {
        return deleteBoard(boardKey).then(() => {
            this.props.history.push('/boards');
        });
    };

    handleUpdateBoard = (boardKey, title) => {
        return updateBoard(boardKey, title).then(() => {
            const updatedBoard = { ...this.state.board, ...title };
            this.setState({
                board: updatedBoard,
            });
        });
    };

    getBoardKey() {
        return window.location.href.split('/').pop();
    }

    render() {
        const { board, lists, boardKey } = this.state;
        return this.state.isLoading ? (
            <Spinner />
        ) : (
            !isEmpty(board) && (
                <React.Fragment>
                    <BoardTitle
                        title={board.title}
                        favorite={board.favorite}
                        boardKey={boardKey}
                        onAddToFavorites={this.handleAddToFavorites}
                        deleteBoard={this.handleDeleteBoard}
                        updateBoard={this.handleUpdateBoard}
                    />

                    <Lists>
                        {lists.map((list, index) => (
                            <List key={index}>
                                <ListHeader
                                    listKey={list.key}
                                    listTitle={list.title}
                                    onEditList={this.handleUpdateList}
                                    onDeleteList={this.handleDeleteList}
                                />
                                <Cards list={list} />
                            </List>
                        ))}
                        <AddList>
                            <FormCreation placeholder="Create new list" onCreate={this.handleCreateList} />
                        </AddList>
                    </Lists>
                </React.Fragment>
            )
        );
    }
}

const authCondition = authUser => !!authUser;

export const WrapperBoardScreen = withRouter(
    withAuthorization(authCondition)(DragDropContext(HTML5Backend)(BoardScreen))
);

const AddList = styled.div`
    width: 272px;
    margin: 0 4px;
    display: inline-block;
`;

export const Lists = styled.div`
    background-color: #0079bf;
    flex: 1;
    display: flex;
    overflow: auto;
    white-space: nowrap;
    padding: 0 1rem;

    > div {
        margin-right: 1rem;
    }
`;
