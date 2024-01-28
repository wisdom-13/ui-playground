import update from 'immutability-helper'
import { useCallback, useState } from 'react'
import styled from '@emotion/styled/macro';

import { Card } from './Card'

const Wrap = styled.div`
  display: grid;
	grid-template-columns: repeat(3, 1fr);
	grid-template-rows: repeat(5, minmax(50px,auto));
	grid-auto-flow: dense;
  gap: 1rem;
`;


export interface Item {
  id: number
  text: string
  grid: Array<number>
}

export interface ContainerState {
  cards: Item[]
}

export default function Container() {
  const [cards, setCards] = useState([
    {
      id: 1,
      text: 'Write a cool JS library',
      grid: [1, 1],
    },
    {
      id: 2,
      text: 'Make it generic enough',
      grid: [2, 1],
    },
    {
      id: 3,
      text: 'Write README',
      grid: [1, 2],
    },
    {
      id: 4,
      text: 'Create some examples',
      grid: [1, 1],
    },
    {
      id: 5,
      text: 'Spam in Twitter and IRC to promote it (note that this element is taller than the others)',
      grid: [1, 1],
    },
    {
      id: 6,
      text: '???',
      grid: [1, 1],
    },
    {
      id: 7,
      text: 'PROFIT',
      grid: [1, 1],
    },
  ])

  const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
    setCards((prevCards: Item[]) =>
      update(prevCards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevCards[dragIndex] as Item],
        ],
      }),
    )
  }, [])

  const renderCard = useCallback(
    (card: Item, index: number) => {
      return (
        <Card
          key={card.id}
          index={index}
          id={card.id}
          text={card.text}
          grid={card.grid}
          moveCard={moveCard}
        />
      )
    },
    [],
  )

  return (
    <>
      {/* <div style={style}>{cards.map((card, i) => renderCard(card, i))}</div> */}
      <Wrap>
        {cards.map((card, i) => renderCard(card, i))}
      </Wrap>
    </>
  )
}

