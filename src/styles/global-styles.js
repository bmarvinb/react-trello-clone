import 'antd/dist/antd.css';
import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
body {
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
}

#root {
  height: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;


  h1, h2, h3, h4, h5, h6 {
    padding: 0;
    margin: 0;
  }


  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
  }
}


* {
  box-sizing: border-box;
}

.ant-modal {
  &-body {
    display: flex;   
    padding-top: 0!important;
  }
  &-header {
    display: flex;
    border-bottom: none!important;
  }
  &-footer {
    border-top: none!important;
  }
  &-title {
    width: 100%;
  }
}

.card-label {
  &-green {
    background: #61bd4f;
  }
  &-yellow {
    background: #f2d600;
  }
  &-orange {
    background: #ff9f1a;
  }
  &-red {
    background: #eb5a46;
  }
  &-purple {
    background: #c377e0;
  }
  &-blue {
    background: #0079bf;
  }
}
.login-buttons{
  display: flex;
  flex-direction:column;
  align-items: center;
}
`;
