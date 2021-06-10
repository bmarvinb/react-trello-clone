import { DropTarget } from 'react-dnd';
import React, { Component } from 'react';

import CardContainer from './CardContainer';
import { addCard, deleteCard, card, moveCard, getCard } from '../../core/api/db';
import { FormCreation } from './FormCreation';
import { ItemTypes } from '../../core/constants';
import { mergeDataWithKey } from '../../shared/utils';

const cardTarget = {
    drop(props, monitor, component) {
        const item = monitor.getItem();
        item.onMoveCard(component, item.listKey, props.list.key, item.card.key, item.card);
    },
};

function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
    };
}

class Cards extends Component {
    state = {
        cards: {},
    };

    componentDidMount = () => {
        getCard(this.props.list.key).then(snapshot => {
            const snapshotVal = snapshot.val();
            if (!snapshotVal) {
                return;
            }
            const updatedCards = { ...this.state.cards };
            updatedCards[this.props.list.key] = mergeDataWithKey(snapshotVal);
            this.setState({
                cards: updatedCards,
            });
        });
    };

    handleCreateCard = cardTitle => {
        const { list } = this.props;
        return addCard(list.key, cardTitle)
            .then(() => getCard(list.key))
            .then(snapshot => {
                const snapshotVal = snapshot.val();
                if (!snapshotVal) {
                    return;
                }
                const updatedCards = { ...this.state.cards };
                updatedCards[list.key] = mergeDataWithKey(snapshotVal);

                this.setState({
                    cards: updatedCards,
                });
            });
    };

    handleEditCard = (listKey, cardKey, card) => {
        return card(listKey, cardKey, card).then(() => {
            const updatedCards = { ...this.state.cards };
            const cardIndex = updatedCards[listKey].findIndex(card => card.key === cardKey);
            updatedCards[listKey][cardIndex] = {
                ...updatedCards[listKey][cardIndex],
                ...card,
            };

            this.setState(() => ({
                cards: updatedCards,
            }));
        });
    };

    moveCard = (component, oldListKey, newListKey, cardKey, card) => {
        moveCard(oldListKey, newListKey, cardKey, card).then(() => {
            const cardItems = this.state.cards[oldListKey].filter(card => card.key !== cardKey);
            const updatedCards = { ...this.state.cards };
            updatedCards[oldListKey] = cardItems;
            this.setState({
                cards: updatedCards,
            });

            const destCardWrap = { ...component.state.cards };
            const destCards = destCardWrap[newListKey] || [];
            destCards.push(card);
            destCardWrap[newListKey] = destCards;
            component.setState({
                cards: destCardWrap,
            });
        });
    };

    handleDeleteCard = (listKey, cardKey) => {
        return deleteCard(listKey, cardKey).then(() => {
            const updatedCards = { ...this.state.cards };
            updatedCards[listKey] = this.state.cards[listKey].filter(card => card.key !== cardKey);
            this.setState({
                cards: updatedCards,
            });
        });
    };

    render() {
        const { list, connectDropTarget } = this.props;
        const { cards } = this.state;

        const listCards = cards[list.key] ? cards[list.key] : [];
        return connectDropTarget(
            <div>
                {listCards.map(card => (
                    <CardContainer
                        key={card.key}
                        listKey={list.key}
                        card={card}
                        onEditCard={this.handleEditCard}
                        onMoveCard={this.moveCard}
                        onDeleteCard={this.handleDeleteCard}
                    />
                ))}
                <FormCreation placeholder="Create card" onCreate={this.handleCreateCard} />
            </div>
        );
    }
}

export default DropTarget(ItemTypes.CARD, cardTarget, collect)(Cards);
