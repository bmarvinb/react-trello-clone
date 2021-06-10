import { Button, Input, Modal } from 'antd';
import React, { Component } from 'react';
import styled from 'styled-components';

import { DEFAULT_COLOR } from '../../core/constants';

const StyledInput = styled(Input)`
    margin-bottom: 10px !important;
`;

const BoardForm = styled.form`
    width: 100%;
`;

export class CreateBoardModal extends Component {
    state = {
        boardTitle: '',
    };

    handleCreateBoard = (event, callback) => {
        event.preventDefault();
        const board = {
            title: this.state.boardTitle,
            color: DEFAULT_COLOR,
        };
        if (!board.title) {
            return;
        }
        return callback(board).then(() => {
            this.setState(() => ({
                boardTitle: '',
            }));
        });
    };

    handleBoardTitleChange = event => {
        this.setState({
            boardTitle: event.target.value,
        });
    };

    render() {
        const { onCloseModal, onCreateBoard, visible } = this.props;

        return (
            <Modal
                title="Create board"
                width="320px"
                style={{ top: 20 }}
                visible={visible}
                onCancel={onCloseModal}
                footer={null}
            >
                <BoardForm onSubmit={event => this.handleCreateBoard(event, onCreateBoard)}>
                    <StyledInput
                        placeholder="Add board title"
                        onChange={event => this.handleBoardTitleChange(event)}
                        value={this.state.boardTitle}
                    />
                    <Button type="primary" onClick={event => this.handleCreateBoard(event, onCreateBoard)}>
                        Create
                    </Button>
                </BoardForm>
            </Modal>
        );
    }
}
