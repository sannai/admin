import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actions } from '../../redux'
import styled from 'styled-components'
import dayjs from 'dayjs'
import LocalizedFormat from 'dayjs/plugin/localizedFormat'
dayjs.extend(LocalizedFormat)
import ManagerCommon from '../../components/manager-common'
import Table from '../../components/table'
import PopUp from '../../components/manager-common/PopUp'
import Input from '../../components/Input'
import Radio from '../../components/radio'
import Button from '../../components/button'
import Paging from '../../components/paging'

const { Column } = Table

const Container = styled.div`
    height: 100%;
    margin: 20px;
`
const MySexRadio = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 10px;
`
const MySpan = styled.span``
const MyFooter = styled.footer`
    display: flex;
    justify-content: center;
    :first-of-type button {
        margin-right: 10px;
        a {
            color: #fff;
        }
    }
`
function Account(props) {
    const [account, setAccount] = useState({})
    const [keyword, setKeyword] = useState('')
    const [isShowEdit, setIsShowEdit] = useState(false)
    const [isDisabled, setIsDisabled] = useState(false)
    const [sexOptions, setSexOptions] = useState([
        { id: 1, label: '男', value: 0, name: 'sex' },
        { id: 2, label: '女', value: 1, name: 'sex' },
    ])
    const [statuOptions, setStatuOptions] = useState([
        { id: 2, label: '启用', value: 1, name: 'status' },
        { id: 1, label: '禁用', value: 0, name: 'status' },
    ])
    const [current, setCurrent] = useState(1)
    const [functButton, setFunctButton] = useState([{ id: 1, text: '保存' }, { id: 2, text: '取消' }])
    useEffect(() => {
        if (!props.isAccount && !props.accountReady) {
            let data = {
                page: 1,
                limit: 10,
                field: 'create_time',
                order: 'desc',
            }
            //账号列表
            props.getAccount(data)
        }
    }, [props.isAccount, props.accountReady])
    //弹窗
    const handleFunct = (text, item) => {
        if (text === '编辑') {
            setIsShowEdit(true)
            setIsDisabled(true)
            setFunctButton([{ id: 1, text: '保存' }, { id: 2, text: '取消' }])
            setAccount(item)
        } else if (text === '添加') {
            setIsShowEdit(true)
            setIsDisabled(false)
            setFunctButton([{ id: 1, text: '添加' }, { id: 2, text: '取消' }])
            setAccount({
                username: '',
                realname: '',
                sex: 0,
            })
        } else if (text === '关闭') {
            setIsShowEdit(false)
            if (props.usernameMsg) {
                props.clearMsg({
                    type: 'usernameMsg',
                })
            } else if (props.realnameMsg) {
                props.clearMsg({
                    type: 'realnameMsg',
                })
            }
        }
    }
    //搜索
    const handleChangeSearch = text => {
        let data = {
            keyword,
            page: 1,
            limit: 10,
            field: 'create_time',
            order: 'desc',
        }
        if (text === '搜索') {
            text === '搜索' && props.getAccount(data)
        } else {
            setKeyword(text)
            delete data.keyword
            text === '' && props.getAccount(data)
        }
    }
    //账号
    const handleChange = (event, name) => {
        setAccount({
            ...account,
            [name]: event.target.value,
        })
        if (props.name + 'Msg') {
            props.clearMsg({
                type: name + 'Msg',
            })
        }
    }
    //性别/状态
    const handleChangeRadio = (event, name) => {
        setAccount({
            ...account,
            [name]: event.target.value,
        })
    }
    //分页
    const handleChangePaging = value => {
        let data = {
            page: value,
            limit: 10,
            field: 'create_time',
            order: 'desc',
        }
        props.getAccount(data)
        setCurrent(value)
    }
    //输入验证
    const checkForm = () => {
        let isOk = true
        if (!account.username) {
            props.setMsg({
                type: 'usernameMsg',
                message: '账号不能为空',
            })
            isOk = false
        } else if (!/^1[34578]\d{9}$/.test(account.username)) {
            props.setMsg({
                type: 'usernameMsg',
                message: '账号输入手机号码',
            })
            isOk = false
        } else if (!account.realname) {
            props.setMsg({
                type: 'realnameMsg',
                message: '姓名不能为空',
            })
            isOk = false
        } else if (!account.realname) {
            props.setMsg({
                type: 'realnameMsg',
                message: '姓名不能为空',
            })
            isOk = false
        }
        return isOk
    }
    //添加/保存/取消
    const handleClickSaveAndCancel = text => {
        if (checkForm()) {
            let data = {
                id: account.id,
                username: account.username,
                realname: account.realname,
                sex: Number(account.sex),
                status: Number(account.status),
            }
            if (text === '保存') {
                props.editAdmins(data)
            } else if (text === '添加') {
                delete data.status
                props.addAdmins(data)
            }
            setIsShowEdit(false)
        }
    }
    const styledOptions = {
        bgColor: '#1890ff',
        borderColor: '#1890ff',
        HbgColor: '#40a9ff',
        HborderColor: '#40a9ff',
    }
    const initAccountData = () => {
        props.accountData.map((item, index) => {
            item.newSex = item.sex === 0 ? '男' : '女'
            item.newStatus = item.status === 1 ? '启用' : '禁用'
            item.newLoginTime = dayjs(item.loginTime * 1000).format('YYYY 年 M 月 D 日')
            item.newCreateTime = dayjs(item.createTime * 1000).format('YYYY 年 M 月 D 日')
        })
        return props.accountData
    }
    return (
        <Container>
            <ManagerCommon addText='账号添加' onClick={handleFunct} onChangeSearch={handleChangeSearch} />
            <Table data={initAccountData()}>
                <Column dataIndex='username' title='账号' />
                <Column dataIndex='realname' title='姓名' />
                <Column dataIndex='newSex' title='性别' />
                <Column dataIndex='newStatus' title='状态' />
                <Column dataIndex='newLoginTime' title='登录时间' />
                <Column dataIndex='newCreateTime' title='创建时间' />
                <Column
                    title='功能'
                    render={(data, index) => (
                        <MyFooter>
                            <Button styledOptions={styledOptions} onClick={() => handleFunct('编辑', data)}>
                                编辑
                            </Button>
                        </MyFooter>
                    )}
                />
            </Table>
            <Paging
                onChange={handleChangePaging}
                current={current}
                total={Math.ceil(props.accountPageData.total / props.accountPageData.limit)}
            />
            {isShowEdit && (
                <PopUp title={isDisabled ? '编辑' : '添加'} onClick={handleFunct}>
                    <Input
                        type='text'
                        value={account.username}
                        label='账号'
                        message={props.usernameMsg}
                        onChange={event => handleChange(event, 'username')}
                        isDisabled={isDisabled}
                    />
                    <Input
                        type='text'
                        value={account.realname}
                        label='姓名'
                        message={props.realnameMsg}
                        onChange={event => handleChange(event, 'realname')}
                    />
                    <MySexRadio>
                        <MySpan>性别：</MySpan>
                        {sexOptions.map((item, index) => (
                            <Radio
                                key={item.id}
                                value={item.value}
                                defaultValue={account.sex}
                                name='sex'
                                onChange={event => handleChangeRadio(event, 'sex')}
                            >
                                {item.label}
                            </Radio>
                        ))}
                    </MySexRadio>
                    {isDisabled && (
                        <MySexRadio>
                            <MySpan>状态：</MySpan>
                            {statuOptions.map((item, index) => (
                                <Radio
                                    key={item.id}
                                    value={item.value}
                                    defaultValue={account.status}
                                    name='status'
                                    onChange={event => handleChangeRadio(event, 'status')}
                                >
                                    {item.label}
                                </Radio>
                            ))}
                        </MySexRadio>
                    )}
                    <MyFooter>
                        {functButton.map((item, index) => (
                            <Button
                                key={item.id}
                                styledOptions={styledOptions}
                                onClick={() => handleClickSaveAndCancel(item.text)}
                            >
                                {item.text}
                            </Button>
                        ))}
                    </MyFooter>
                </PopUp>
            )}
        </Container>
    )
}

const mapStateToProps = state => {
    return state.account
}

const mapDispatchToProps = dispatch => bindActionCreators(actions.account, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Account)
