import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import Menu from './SelectMenu'
const Container = styled.div`
    width: 186px;
    height: 48px;
    display: flex;
    position: relative;
`
const MySpan = styled.span`
    height: 28px;
    line-height: 28px;
`
const MyBox = styled.div`
    width: 156px;
    height: 28px;
    line-height: 28px;
    position: relative;
    box-sizing: border-box;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    background: #fff;
    cursor: pointer;
    &:hover {
        border-color: #40a9ff;
    }
    &:active {
        border-color: #40a9ff;
        box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
    }
`
const MyReveal = styled.div`
    box-sizing: border-box;
    height: 28px;
    line-height: 28px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
`
const MySelected = styled.div``
const MyTriangle = styled.span`
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-bottom: 8px solid #d9d9d9;
    transform: rotate(180deg);
`
const Helper = styled.div`
    height: 20px;
    font-size: 12px;
    line-height: 20px;
    text-indent: 15px;
    color: red;
    position: absolute;
    top: 30px;
    left: 14px;
`
function Select(props) {
    const [isShow, setIsShow] = useState(false)
    const tagRef = useRef(null)

    const handleClickMenu = () => {
        setIsShow(!isShow)
    }
    const handleClickLi = (item, index) => {
        props.onChange(item, index)
        setIsShow(false)
    }
    const handleCloseMenu = () => {
        setIsShow(false)
    }
    return (
        <Container>
            <MySpan>{props.name}：</MySpan>
            <MyBox>
                <MyReveal onClick={handleClickMenu} ref={tagRef}>
                    <MySelected>{props.value.text}</MySelected>
                    <MyTriangle />
                </MyReveal>
                {isShow && (
                    <Menu
                        options={props.options}
                        onClickCloseMenu={handleCloseMenu}
                        onClickLi={handleClickLi}
                        tagRef={tagRef}
                    />
                )}
            </MyBox>
            <Helper>{props.message}</Helper>
        </Container>
    )
}

export default Select
