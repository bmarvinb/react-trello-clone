import { DragSource } from 'react-dnd';
import React, { Component } from 'react';

import { Card } from './components/Card';
import { CardModal } from './CardModal';
import { ItemTypes } from '../../core/constants/index';

const cardSource = {
    beginDrag(props) {
        return props;
    },
    endDrag(props) {
        return props;
    },
};

function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging(),
    };
}

class CardContainer extends Component {
    state = {
        card: {},
        modalIsVisible: false,
    };

    moveCard = (oldListKey, newListKey, cardKey, card) => {
        this.props.onMoveCard(oldListKey, newListKey, cardKey, card);
    };

    showModal = () => {
        this.setState({
            modalIsVisible: true,
        });
    };

    handleOk = () => {
        this.setState({
            modalIsVisible: false,
        });
    };

    handleCancel = () => {
        this.setState({
            modalIsVisible: false,
        });
    };

    render() {
        const { listKey, card, connectDragSource, onEditCard, onDeleteCard } = this.props;
        const { modalIsVisible } = this.state;

        return connectDragSource(
            <div>
                <Card
                    card={card}
                    showModal={this.showModal}
                    onEditCard={onEditCard}
                    onDeleteCard={onDeleteCard}
                    listKey={listKey}
                />

                <CardModal
                    listKey={listKey}
                    card={card}
                    visible={modalIsVisible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    onEditCard={onEditCard}
                    onDeleteCard={onDeleteCard}
                />
            </div>
        );
    }
}

export default DragSource(ItemTypes.CARD, cardSource, collect)(CardContainer);
