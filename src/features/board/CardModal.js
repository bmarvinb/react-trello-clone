import { Icon, Modal } from 'antd';
import React, { Component } from 'react';
import styled from 'styled-components';

import { CardDescription } from './CardDescription';
import { LABELS } from '../../core/constants';
import { Label } from './Label';

export class CardModal extends Component {
    state = {
        modalIsVisible: false,
    };

    render() {
        const { listKey, card, visible, onOk, onCancel, onEditCard } = this.props;

        return (
            <Modal
                title={<CardDetail title={<h4>{card.title}</h4>} icon={<StyledIcon type="project" />} />}
                visible={visible}
                onOk={onOk}
                onCancel={onCancel}
                footer={null}
            >
                <Details>
                    <CardDetail
                        title={<h4>Labels</h4>}
                        icon={<Icon type="tag" />}
                        content={<CardLabel card={card} listKey={listKey} onEditCard={onEditCard} />}
                    />

                    <CardDetail
                        icon={<StyledIcon type="align-left" />}
                        title={<h4>Description</h4>}
                        content={<CardDescription card={card} listKey={listKey} onEditCard={onEditCard} />}
                    />
                </Details>
            </Modal>
        );
    }
}

const Details = styled.div`
    flex-direction: column;
    width: 100%;
    > div {
        margin-bottom: 16px;
        &:last-child {
            margin-bottom: 0;
        }
    }
`;

const StyledIcon = styled(Icon)`
    color: #798d99 !important;
`;

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

class CardLabel extends Component {
    render() {
        const { card, listKey, onEditCard } = this.props;
        return LABELS.map((label, index) => (
            <Label
                key={index}
                color={label.color}
                text={label.text}
                active={card.label === label.text}
                card={card}
                listKey={listKey}
                onClick={onEditCard}
            />
        ));
    }
}
