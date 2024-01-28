import React from 'react';
import Carousel from './components/Carousel';
import InfiniteScrollUI from './project/InfiniteScrollUI';
import IntersectionObserverUI from './project/IntersectionObserverUI';
import ModalUI from './project/ModalUI';
import PaginationUI from './project/PaginationUI';
import SkeletonUI from './project/SkeletonUI';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import Container from './components/Dnd/Container';


export default function App() {
  return (
    <>
      {/* <SkeletonUI />
      <Carousel />
      <PaginationUI />
      <ModalUI />
      <InfiniteScrollUI />
      <IntersectionObserverUI /> */}
      <DndProvider backend={HTML5Backend}>
        <Container />
      </DndProvider>
    </>
  );
}

