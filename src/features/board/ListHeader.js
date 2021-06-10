import { darken } from 'polished';
import { Dropdown, Icon, Input, Menu } from 'antd';
import React, { Component } from 'react';
import styled from 'styled-components';

import { Button } from '../../shared/components/Button';

export class ListHeader extends Component {
    state = {
        edit: false,
        title: '',
    };

    handleEnableEdit = () => {
        const { listTitle } = this.props;
        this.setState(() => ({ edit: true, title: listTitle }));
    };

    handleDisableEdit = () => {
        this.setState(() => ({ edit: false }));
    };

    handleInputChange = event => {
        this.setState({ title: event.target.value });
    };

    handleFormSubmit = (event, callback, listKey, listTitle) => {
        event.preventDefault();

        callback(listKey, listTitle).then(() => this.setState(() => ({ title: '', edit: false })));
    };

    handleDeleteList = (callback, listKey) => {
        callback(listKey);
    };

    render() {
        const { listTitle, listKey, onEditList, onDeleteList } = this.props;
        const { edit, title } = this.state;
        return (
            <Header>
                {edit ? (
                    <form
                        onSubmit={event => this.handleFormSubmit(event, onEditList, listKey, title)}
                        onBlur={event => this.handleFormSubmit(event, onEditList, listKey, title)}
                    >
                        <InputTitle value={title} onChange={this.handleInputChange} />
                    </form>
                ) : (
                    <h3 onClick={this.handleEnableEdit}>{listTitle}</h3>
                )}
                <Dropdown
                    overlay={
                        <Menu>
                            <Menu.Item key="1" onClick={event => this.handleDeleteList(onDeleteList, listKey)}>
                                Delete This List
                            </Menu.Item>
                        </Menu>
                    }
                    trigger={['click']}
                >
                    <StyledButton>
                        <Icon type="ellipsis" />
                    </StyledButton>
                </Dropdown>
            </Header>
        );
    }
}

const Header = styled.div`
    display: flex;
    margin-bottom: 5px;
    background: #fff;
    justify-content: space-between;
    border-radius: 5px;
    padding: 0 10px;
    align-items: center;
`;

const StyledButton = styled(Button)`
    &:hover {
        background: ${darken(0.075, '#dfe3e6')};
        color: gray;
    }
    &:active {
        background: ${darken(0.1, '#dfe3e6')};
    }
    color: gray;
`;

const InputTitle = styled(Input)`
    height: 25px !important;
    margin-bottom: 0.5em !important;
    font-weight: bold;
    padding: 4px 5px !important;
    font-size: 1.17em !important;
`;
