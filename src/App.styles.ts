import styled, { createGlobalStyle } from 'styled-components';
import BGimage from './images/background.jpg';

export const GlobalStyle = createGlobalStyle`
 html{
   height: 100% ;
 }

 body {
   background-image: url(${BGimage});
   background-size: cover;
   margin: 0;
   padding: 0 20px;
   display: flex;
   justify-content: center;
 }

 * {
   box-sizing: border-box;
   font-family: 'Catamaran', sans-serif;
 }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  > p {
    color: #fff;
  }

  .score {
    color: #fff;
    font-size: 2rem;
    margin: 0;
  }

  h1 {
    font-family: Fascinate Inline, Haettenschweiler, 'Arial Narrow Bold',
      sans-serif;

    background-image: linear-gradient(180deg, #fff, #87f1ff);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    -moz-background-clip: text;
    -moz-text-fill-color: transparent;
    filter: drop-shadow(2px, 2px #0085a3);
    font-size: 70px;
    font-weight: 400;
    text-align: center;
    margin: 20px;
  }

  .start,
  .next {
    cursor: pointer;
    background: linear-gradient(180deg, #fff, #ffcc91);
    border: 2px solid #d38558;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.25);
    height: 40px;
    margin: 20px 0;
    padding: 0 40px;
  }

  .start {
    max-width: 200px;
  }
`;

export const LabelWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 350px;
  color: white;

  label {
    cursor: pointer;
    position: relative;

    &:hover {
      color: #ffcc91;
    }
  }

  input {
    position: absolute;
    visibility: hidden;
  }
  .check {
    display: block;
    position: absolute;
    border: 2px solid #aaaaaa;
    border-radius: 100%;
    height: 20px;
    width: 20px;
    top: 3px;
    right: -25px;
    z-index: 5;
    transition: border 0.25s linear;
    -webkit-transition: border 0.25s linear;
  }

  .check::before {
    content: '';
    display: block;
    position: absolute;

    border-radius: 100%;
    height: 8px;
    width: 8px;
    top: 2px;
    left: 2px;
    margin: auto;
  }

  input[type='radio']:checked ~ .check {
    border: 4px solid #ffcc91;
  }

  input[type='radio']:checked ~ .check::before {
    background: #ffe4c4;
  }
`;
