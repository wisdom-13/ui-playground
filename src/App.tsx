import { useState } from 'react';
import Carousel from './components/Carousel';
import InfiniteScrollUI from './project/InfiniteScrollUI';
import IntersectionObserverUI from './project/IntersectionObserverUI';
import ModalUI from './project/ModalUI';
import PaginationUI from './project/PaginationUI';
import SkeletonUI from './project/SkeletonUI';
import styled from '@emotion/styled/macro';
import DndUI from './project/DndUI';
import './globals.css'

const Wrap = styled.div`
  display: flex;
  width: 100%;
`;

const Header = styled.div`
  width: 250px;
  position: fixed;
  height: 100vh;
  padding: 1rem;
  background-color: #f2f2f2;
`

const Content = styled.div`
  width: calc(100% - 250px);
  margin-left: 250px;
  padding: 1rem;
`

const Title = styled.h1`
  padding: 0 !important;
  margin-bottom: 20px;
`

const MenuUl = styled.ul``

const MenuLi = styled.li`
  list-style: none;
  padding: 10px 0;
  cursor: pointer;

  :hover {
    font-weight: bold;
  }
`

export default function App() {
  const [menu, setMenu] = useState<string>('DndUI')
  return (
    <>
      <Wrap>
        <Header>
          <Title>ui-playground</Title>
          <MenuUl>
            <MenuLi onClick={() => setMenu('SkeletonUI')}>SkeletonUI</MenuLi>
            <MenuLi onClick={() => setMenu('Carousel')}>Carousel</MenuLi>
            <MenuLi onClick={() => setMenu('PaginationUI')}>PaginationUI</MenuLi>
            <MenuLi onClick={() => setMenu('ModalUI')}>ModalUI</MenuLi>
            <MenuLi onClick={() => setMenu('InfiniteScrollUI')}>InfiniteScrollUI</MenuLi>
            <MenuLi onClick={() => setMenu('IntersectionObserverUI')}>IntersectionObserverUI</MenuLi>
            <MenuLi onClick={() => setMenu('DnDUI')}>DnDUI</MenuLi>
          </MenuUl>
        </Header>
        <Content>
          {menu === 'SkeletonUI' && <SkeletonUI />}
          {menu === 'Carousel' && <Carousel />}
          {menu === 'PaginationUI' && <PaginationUI />}
          {menu === 'ModalUI' && <ModalUI />}
          {menu === 'InfiniteScrollUI' && <InfiniteScrollUI />}
          {menu === 'IntersectionObserverUI' && <IntersectionObserverUI />}
          {menu === 'DnDUI' && <DndUI />}
        </Content>
      </Wrap>


    </>
  );
}

