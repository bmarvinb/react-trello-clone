import { DragDropContext } from 'react-dnd';
import { findIndex, isEmpty } from 'lodash';
import HTML5Backend from 'react-dnd-html5-backend';
import { List } from 'antd';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { AddList, Lists } from './styled';
import { BoardTitle } from './components/BoardTitle';
import Cards from './Cards';
import {
    doCreateList,
    doDeleteBoard,
    doDeleteList,
    doEditBoard,
    doUpdateBoard,
    doUpdateList,
    onceGetBoard,
    onceGetLists,
} from '../../core/api/db';
import { FormCreation } from './FormCreation';
import { ListHeader } from './components/ListHeader';
import { Loader } from '../../components/Loader';
import { mergeDataWithKey } from '../../utils';
import { withAuthorization } from '../../auth/utils/AuthHOC';

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
        Promise.all([onceGetBoard(boardKey), onceGetLists(boardKey)])
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
        return doUpdateList(boardKey, listKey, { title }).then(response => {
            const lists = [...this.state.lists];
            lists[findIndex(lists, list => list.key === listKey)] = {
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
        return doEditBoard(boardKey, updatedBoard).then(() => {
            this.setState(() => ({
                board: updatedBoard,
            }));
        });
    };

    handleDeleteBoard = boardKey => {
        return doDeleteBoard(boardKey).then(() => {
            this.props.history.push('/boards');
        });
    };

    handleUpdateBoard = (boardKey, title) => {
        return doUpdateBoard(boardKey, title).then(() => {
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
            <Loader />
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
