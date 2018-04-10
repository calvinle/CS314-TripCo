import React, { Component } from 'react'
import PropTypes from 'prop-types'
import update from 'immutability-helper'
import { DropTarget, DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import DestinationCard from './DestinationCard'
import DestinationCardType from './DestinationCardType'

const style = {
    width: 400,
}

const cardTarget = {
    drop() { },
}

@DragDropContext(HTML5Backend)
    @DropTarget(DestinationCardType.CARD, cardTarget, connect => ({
    connectDropTarget: connect.dropTarget(),
}))
export default class DestinationContainer extends Component {
    static propTypes = {
        connectDropTarget: PropTypes.func.isRequired,
    }

    constructor(props) {
        super(props)
        this.moveCard = this.moveCard.bind(this)
        this.findCard = this.findCard.bind(this)
        this.state = {
            cards: [
                {
                    id: 1,
                    text: 'This is a destination',
                },
                {
                    id: 2,
                    text: 'This is another destination',
                },
                {
                    id: 3,
                    text: 'And another',
                },
                {
                    id: 4,
                    text: 'Yet another',
                },
                {
                    id: 5,
                    text: 'More',
                },
                {
                    id: 6,
                    text: 'One more',
                },
                {
                    id: 7,
                    text: 'Final',
                },
            ],
        }
    }

    moveCard(id, atIndex) {
        const { card, index } = this.findCard(id)
        this.setState(
            update(this.state, {
                cards: {
                    $splice: [[index, 1], [atIndex, 0, card]],
                },
            }),
        )
    }

    findCard(id) {
        const { cards } = this.state
        const card = cards.filter(c => c.id === id)[0]

        return {
            card,
            index: cards.indexOf(card),
        }
    }

    render() {
        const { connectDropTarget } = this.props
        const { cards } = this.state

        return connectDropTarget(
            <div style={style}>
                {cards.map(card => (
                    <DestinationCard
                        key={card.id}
                        id={card.id}
                        text={card.text}
                        moveCard={this.moveCard}
                        findCard={this.findCard}
                    />
                ))}
            </div>,
        )
    }
}