import { Dropdown, Icon, Menu } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import React, { Component } from 'react';
import styled from 'styled-components';

import { ACCOUNT, BOARDS } from '../core/routes/routes';
import { Button } from '../components/Button';
import { Nav, NavItems, NavUser } from './styled';
import { SignOutButton } from '../auth/SignOut';

class NavigationAuth extends Component {
    render() {
        return (
            <Nav>
                <NavItems>
                    <Link to={BOARDS}>
                        <StyledButton>
                            <Icon type="home" />
                        </StyledButton>
                    </Link>
                </NavItems>
                <NavUser>
                    <Dropdown overlay={menu} trigger={['click']}>
                        <StyledButton>
                            <Icon type="setting" theme="outlined" />
                        </StyledButton>
                    </Dropdown>
                </NavUser>
            </Nav>
        );
    }
}

const StyledLink = styled(Link)`
    display: inline-block !important;
`;

const StyledButton = styled(Button)`
    background: hsla(0, 0%, 100%, 0.3);
    &:hover {
        background: hsla(0, 0%, 100%, 0.2);
    }
    &:active {
        background: hsla(0, 0%, 100%, 0.1);
    }
`;

const menu = (
    <Menu>
        <Menu.Item key="0">
            <Icon type="user" theme="outlined" />
            <StyledLink to={ACCOUNT}>Settings</StyledLink>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="1">
            <Icon type="logout" theme="outlined" />
            <SignOutButton />
        </Menu.Item>
    </Menu>
);

export default withRouter(NavigationAuth);
