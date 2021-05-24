import { find } from 'lodash';
import { Icon, Input } from 'antd';
import React, { Component } from 'react';
import styled from 'styled-components';

import { GrayButton } from '../../../components/Button';
import { Label } from './Label';
import { LABELS } from '../../../core/constants';

export class Card extends Component {
    state = {
        showEditIcons: false,
        editMode: false,
        title: '',
    };

    handleShowEditButton = () => {
        this.setState(() => ({ showEditIcons: true }));
    };

    handleHideEditButton = () => {
        this.setState(() => ({ showEditIcons: false }));
    };

    handleEnableEdit = () => {
        const { title } = this.props.card;
        this.setState(() => ({ editMode: true, title }));
    };

    handleDisableEdit = () => {
        this.setState(() => ({ editMode: false }));
    };

    handleTitleChange = event => {
        this.setState({ title: event.target.value });
    };

    handleSubmitForm = (event, callback, listKey, cardKey, title) => {
        event.preventDefault();

        callback(listKey, cardKey, { title }).then(() =>
            this.setState(() => ({
                editMode: false,
            }))
        );
    };

    handleDeleteCard = (callback, listKey, cardKey) => {
        callback(listKey, cardKey);
    };

    render() {
        const { showModal, onEditCard, onDeleteCard, card, listKey } = this.props;
        const { showEditIcons, editMode, title } = this.state;
        return (
            <CardBlock
                onMouseEnter={this.handleShowEditButton}
                onMouseLeave={this.handleHideEditButton}
                onBlur={this.handleDisableEdit}
                editMode={editMode}
                onClick={showModal}
            >
                <div>
                    {card && card.label && (
                        <Label color={getColor(LABELS, card.label)} text={card.label} small={true} />
                    )}
                </div>
                {editMode ? (
                    <form onSubmit={event => this.handleSubmitForm(event, onEditCard, listKey, card.key, title)}>
                        <TitleInput value={this.state.title} onChange={event => this.handleTitleChange(event)} />
                    </form>
                ) : (
                    <React.Fragment>
                        {showEditIcons && (
                            <Edit onClick={event => event.stopPropagation()}>
                                <GrayButton onClick={this.handleEnableEdit}>
                                    <Icon type="edit" />
                                </GrayButton>
                                <GrayButton onClick={() => this.handleDeleteCard(onDeleteCard, listKey, card.key)}>
                                    <Icon type="delete" />
                                </GrayButton>
                            </Edit>
                        )}
                        <div>{card.title}</div>
                    </React.Fragment>
                )}
                <div>{card.description && <Icon type="align-left" />}</div>
            </CardBlock>
        );
    }
}

function getColor(labels, text) {
    const label = find(labels, label => label.text === text);
    return label.color;
}

const CardBlock = styled.div`
    position: relative;
    background: white;
    margin-bottom: 7px;
    border-radius: 3px;
    padding: 6px 10px 6px;
    box-shadow: 0px 1px 0px grey;
    &:hover {
        background: ${props => (props.editMode ? '#fff' : '#efefef')};
        cursor: pointer;
    }
`;

const TitleInput = styled(Input)`
    border: none !important;
    outline: none !important;
    height: 20px !important;
    padding-left: 0 !important;
    &:focus {
        box-shadow: none !important;
    }
`;

const Edit = styled.div`
    position: absolute;
    right: 4px;
    top: 4px;
    > div {
        display: inline-block;
    }
`;
