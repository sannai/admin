import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import avatar from '../../../images/logo.jpg'
import Menu from './Menu'

const Container = styled.div`
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 50px;
    padding-right: 20px;
`
const MySubjectName = styled.span`
    line-height: 30px;
    text-align: center;
    width: 58px;
    height: 30px;
    background-color: #ca9fe8;
    color: #fff;
    border-radius: 2px;
`
const MyAvatar = styled.div`
    width: 40px;
    height: 40px;
    display: flex;
    margin-left: 20px;
    background-image: url(${avatar});
    background-size: contain;
    cursor: pointer;
`

const Right = props => {
    const [isInfoMenu, setIsInfoMenu] = useState(false)
    const handleClickInfoMenu = () => {
        setIsInfoMenu(!isInfoMenu)
    }
    const handleCloseMenu = () => {
        setIsInfoMenu(false)
    }
    const tagRef = useRef(null)
    Right.handleClickOutside = () => setIsInfoMenu(false)
    return (
        <Container>
            <MySubjectName>管理</MySubjectName>
            <MyAvatar onClick={handleClickInfoMenu} ref={tagRef} />
            {isInfoMenu && <Menu userInfo={props} close={handleCloseMenu} tagRef={tagRef} />}
        </Container>
    )
}

export default Right
