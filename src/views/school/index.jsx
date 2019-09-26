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
import Select from '../../components/select'
import Button from '../../components/button'
import Paging from '../../components/paging'

const { Column } = Table

const Container = styled.div`
    height: 100%;
    margin: 20px;
`
const MySelectBox = styled.div``
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

function School(props) {
    const [functButton, setFunctButton] = useState([{ id: 1, text: '保存' }, { id: 2, text: '取消' }])
    const [school, setSchool] = useState({})
    const [isShowEdit, setIsShowEdit] = useState(false)
    const [isDisabled, setIsDisabled] = useState(false)
    const [keyword, setKeyword] = useState('')
    const [current, setCurrent] = useState(1)
    const [sexOptions, setSexOptions] = useState([
        { id: 1, label: '男', value: 0, name: 'sex' },
        { id: 2, label: '女', value: 1, name: 'sex' },
    ])
    const [statuOptions, setStatuOptions] = useState([
        { id: 2, label: '启用', value: 1, name: 'status' },
        { id: 1, label: '禁用', value: 0, name: 'status' },
    ])
    const [segmentOptions, setSegmentOptions] = useState([
        { id: 1, label: '小学', value: 1, name: 'segment' },
        { id: 2, label: '中学', value: 2, name: 'segment' },
        { id: 3, label: '高中', value: 3, name: 'segment' },
        { id: 4, label: '大学', value: 4, name: 'segment' },
    ])

    useEffect(() => {
        if (!props.isSchoolTeaching && !props.schoolTeachingReady) {
            let data = {
                page: 1,
                limit: 10,
                field: 'create_time',
                order: 'desc',
            }
            //账号列表
            props.getSchoolTeaching(data)
        }
    }, [props])
    //弹窗
    const handleFunct = (text, item) => {
        if (text === '编辑') {
            setIsShowEdit(true)
            setIsDisabled(true)
            if (typeof item.regionText === 'string') {
                item.regionText = item.regionText.split(',')
                item.area = {
                    text: item.regionText[2],
                    state: true,
                    id: item.areaId,
                }
                item.city = {
                    text: item.regionText[1],
                    state: true,
                    id: item.cityId,
                }
                item.province = {
                    text: item.regionText[0],
                    state: true,
                    id: item.provinceId,
                }
            } else {
                item.area = item.area
                item.city = item.city
                item.province = item.province
            }
            setSchool(item)
            setFunctButton([{ id: 1, text: '保存' }, { id: 2, text: '取消' }])
            //省/市/区
            props.getProvince({ id: 0 })
            props.getCity({ id: item.provinceId })
            props.getArea({ id: item.cityId })
        } else if (text === '添加') {
            setFunctButton([{ id: 1, text: '添加' }, { id: 2, text: '取消' }])
            setSchool(state => ({
                address: '',
                areaId: '',
                cityId: '',
                provinceId: '',
                name: '',
                realname: '',
                segment: 1,
                sex: 0,
                username: '',
                area: {
                    state: false,
                    text: '请选择',
                },
                city: {
                    state: false,
                    text: '请选择',
                },
                province: {
                    state: true,
                    text: '请选择',
                },
            }))
            setIsShowEdit(true)
            setIsDisabled(false)
            props.getProvince({ id: 0 })
        } else if (text === '关闭') {
            setIsShowEdit(false)
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
            text === '搜索' && props.getSchoolTeaching(data)
        } else {
            setKeyword(text)
            delete data.keyword
            text === '' && props.getSchoolTeaching(data)
        }

        //账号列表
    }
    //地址/账号/姓名/学校名称
    const handleChange = (event, name) => {
        setSchool({
            ...school,
            [name]: event.target.value,
        })
        if (props.name + 'Msg') {
            props.clearMsg({
                type: name + 'Msg',
            })
        }
    }

    //省
    const handleChangeProvince = (item, index) => {
        setSchool(state => ({
            ...state,
            province: {
                text: item.name,
                state: true,
                id: item.id,
            },
            city: {
                text: '请选择',
                state: true,
                id: '',
            },
            area: {
                text: '请选择',
                state: false,
                id: '',
            },
        }))
        props.getCity({ id: item.id })
        if (props.provinceMsg) {
            props.clearMsg({
                type: 'provinceMsg',
            })
        }
    }
    //市
    const handleChangeCity = (item, index) => {
        setSchool(state => ({
            ...state,
            city: {
                text: item.name,
                state: true,
                id: item.id,
            },
            area: {
                text: '请选择',
                state: true,
                id: '',
            },
        }))
        if (props.cityMsg) {
            props.clearMsg({
                type: 'cityMsg',
            })
        }
        props.getArea({ id: item.id })
    }
    //区
    const handleChangeArea = (item, index) => {
        setSchool(state => ({
            ...state,
            area: {
                text: item.name,
                state: true,
                id: item.id,
            },
        }))
        if (props.areaMsg) {
            props.clearMsg({
                type: 'areaMsg',
            })
        }
    }
    //性别/状态/学段
    const handleChangeRadio = (event, name) => {
        setSchool({
            ...school,
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
        props.getSchoolTeaching(data)
        setCurrent(value)
    }
    //输入验证
    const checkForm = () => {
        let isOk = true
        if (!school.name) {
            props.setMsg({
                type: 'nameMsg',
                message: '学校名称不能为空',
            })
            isOk = false
        } else if (!school.realname) {
            props.setMsg({
                type: 'realnameMsg',
                message: '姓名不能为空',
            })
            isOk = false
        } else if (!/^1[34578]\d{9}$/.test(school.username)) {
            props.setMsg({
                type: 'usernameMsg',
                message: '账号输入手机号码',
            })
            isOk = false
        } else if (!school.address) {
            props.setMsg({
                type: 'addressMsg',
                message: '地址不能为空',
            })
            isOk = false
        } else if (school.province.text === '请选择') {
            props.setMsg({
                type: 'provinceMsg',
                message: '选择省',
            })
            isOk = false
        } else if (school.city.text === '请选择') {
            props.setMsg({
                type: 'cityMsg',
                message: '选择市',
            })
            isOk = false
        } else if (school.area.text === '请选择') {
            props.setMsg({
                type: 'areaMsg',
                message: '选择区',
            })
            isOk = false
        }
        return isOk
    }
    //保存/添加
    const handleSaveAndPush = text => {
        let data = {
            id: school.id,
            name: school.name,
            segment: school.segment,
            address: school.address,
            provinceId: school.province.id,
            cityId: school.city.id,
            areaId: school.area.id,
            regionText: `${school.province.text},${school.city.text},${school.area.text}`,
            status: Number(school.status),
            teachingPo: {
                id: school.teachingId,
                schoolId: school.id,
                username: school.username,
                realname: school.realname,
                sex: Number(school.sex),
                status: Number(school.status),
            },
        }
        if (checkForm()) {
            if (text === '保存') {
                props.editSchoolTeaching(data)
            } else if (text === '添加') {
                delete data.id
                delete data.teachingPo.id
                delete data.teachingPo.schoolId
                delete data.status
                delete data.teachingPo.status
                props.addSchoolTeaching(data)
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
    const initSchoolData = () => {
        let segment = [
            {
                id: 1,
                segment: '小学',
            },
            {
                id: 2,
                segment: '中学',
            },
            {
                id: 3,
                segment: '高中',
            },
            {
                id: 4,
                segment: '大学',
            },
        ]
        props.schoolTeachingData.map((item, index) => {
            item.newSegment = segment[item.segment - 1].segment
            item.newSex = item.sex === 0 ? '男' : '女'
            item.newStatus = item.status === 1 ? '启用' : '禁用'
            item.newLoginTime = dayjs(item.loginTime * 1000).format('YYYY 年 M 月 D 日')
            item.newCreateTime = dayjs(item.createTime * 1000).format('YYYY 年 M 月 D 日')
        })
        return props.schoolTeachingData
    }
    return (
        <Container>
            <ManagerCommon
                addText='账号学校'
                onClick={handleFunct}
                onChangeSearch={handleChangeSearch}
                keyword={keyword}
            />
            <Table data={initSchoolData()}>
                <Column dataIndex='name' title='学校名称' />
                <Column dataIndex='realname' title='姓名' />
                <Column dataIndex='username' title='账号' />
                <Column dataIndex='newSegment' title='学段' />
                <Column dataIndex='studentCount' title='老师人数' />
                <Column dataIndex='teacherCount' title='学生人数' />
                <Column dataIndex='address' title='地址' />
                <Column dataIndex='newStatus' title='状态' />
                <Column dataIndex='newSex' title='性别' />
                <Column dataIndex='newCreateTime' title='创建时间' />
                <Column dataIndex='newLoginTime' title='登录时间' />
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
                total={Math.ceil(props.schoolTeachingPageData.total / props.schoolTeachingPageData.limit)}
            />
            {isShowEdit && (
                <PopUp title={isDisabled ? '编辑' : '添加'} onClick={handleFunct}>
                    <Input
                        type='text'
                        value={school.name}
                        label='学校'
                        message={props.nameMsg}
                        onChange={event => handleChange(event, 'name')}
                    />
                    <Input
                        type='text'
                        value={school.realname}
                        label='姓名'
                        message={props.realnameMsg}
                        onChange={event => handleChange(event, 'realname')}
                    />
                    <Input
                        type='text'
                        value={school.username}
                        label='账号'
                        message={props.usernameMsg}
                        onChange={event => handleChange(event, 'username')}
                        isDisabled={isDisabled}
                    />
                    <Input
                        type='text'
                        value={school.address}
                        label='地址'
                        message={props.addressMsg}
                        onChange={event => handleChange(event, 'address')}
                    />
                    <MySelectBox>
                        <Select
                            options={props.provinceData}
                            onChange={handleChangeProvince}
                            name='省'
                            value={school.province}
                            message={props.provinceMsg}
                        />
                        <Select
                            options={props.cityData}
                            onChange={handleChangeCity}
                            name='市'
                            value={school.city}
                            message={props.cityMsg}
                        />
                        {school.area.state && (
                            <Select
                                options={props.areaData}
                                onChange={handleChangeArea}
                                name='区'
                                value={school.area}
                                message={props.areaMsg}
                            />
                        )}
                    </MySelectBox>
                    <MySexRadio>
                        <MySpan>性别：</MySpan>
                        {sexOptions.map((item, index) => (
                            <Radio
                                key={item.id}
                                value={item.value}
                                defaultValue={school.sex}
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
                                    defaultValue={school.status}
                                    name='status'
                                    onChange={event => handleChangeRadio(event, 'status', item.value)}
                                >
                                    {item.label}
                                </Radio>
                            ))}
                        </MySexRadio>
                    )}
                    <MySexRadio>
                        <MySpan>学段：</MySpan>
                        {segmentOptions.map((item, index) => (
                            <Radio
                                key={item.id}
                                value={item.value}
                                defaultValue={school.segment}
                                name='segment'
                                onChange={event => handleChangeRadio(event, 'segment')}
                            >
                                {item.label}
                            </Radio>
                        ))}
                    </MySexRadio>
                    <MyFooter>
                        {functButton.map((item, index) => (
                            <Button
                                key={item.id}
                                styledOptions={styledOptions}
                                onClick={() => handleSaveAndPush(item.text)}
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
    return state.school
}

const mapDispatchToProps = dispatch => bindActionCreators(actions.school, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(School)
