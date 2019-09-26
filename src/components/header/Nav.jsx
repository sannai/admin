import React from 'react'
import styled from 'styled-components'
import { Link, withRouter } from 'react-router-dom'

const Container = styled.div`
    height: 100%;
    display: flex;
`
const Line = styled.span`
    height: 8px;
    width: 80px;
    border-radius: 8px;
    position: absolute;
    bottom: 6px;
    transition: background-color 0.1s linear;
    background-color: ${props => (props.isActive ? '#00a6f3' : '#fff')};
`
const Text = styled.div`
    font-size: 20px;
    transition: color 0.1s linear;
    color: ${props => (props.isActive ? '#00a6f3' : '#777')};
`
const Item = styled(Link)`
    display: block;
    width: 80px;
    height: 80px;
    cursor: pointer;
    margin-left: 25px;
    margin-right: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    .split('/')[1] &hover ${Line} {
        background-color: #00a6f3;
    }
`

function Nav(props) {
    return (
        <Container>
            <Item to='/'>
                <Text isActive={props.location.pathname === '/'}>首页</Text>
                <Line isActive={props.location.pathname === '/'} />
            </Item>
            <Item to='/school'>
                <Text isActive={props.location.pathname.split('/')[1] === 'school'}>学校</Text>
                <Line isActive={props.location.pathname.split('/')[1] === 'school'} />
            </Item>
        </Container>
    )
}

export default withRouter(Nav)
