import { switchMap } from 'rxjs/operators'
import { Observable } from 'rxjs'
import { ofType, combineEpics } from 'redux-observable'
import { handleActions, createActions } from 'redux-actions'
import api from '../api'

const {
    getSchoolTeaching,
    getSchoolTeachingSuccess,
    getSchoolTeachingFailed,
    editSchoolTeaching,
    editSchoolTeachingSuccess,
    editSchoolTeachingFailed,
    addSchoolTeaching,
    addSchoolTeachingSuccess,
    addSchoolTeachingFailed,
    getProvince,
    getProvinceSuccess,
    getProvinceFailed,
    getCity,
    getCitySuccess,
    getCityFailed,
    getArea,
    getAreaSuccess,
    getAreaFailed,
    setMsg,
    clearMsg,
} = createActions(
    'get_school_teaching',
    'get_school_teaching_success',
    'get_school_teaching_failed',
    'edit_school_teaching',
    'edit_school_teaching_success',
    'edit_school_teaching_failed',
    'add_school_teaching',
    'add_school_teaching_success',
    'add_school_teaching_failed',
    'get_province',
    'get_province_success',
    'get_province_failed',
    'get_city',
    'get_city_success',
    'get_city_failed',
    'get_area',
    'get_area_success',
    'get_area_failed',
    'set_msg',
    'clear_msg'
)

const epic = action$ =>
    action$.pipe(
        ofType(getSchoolTeaching),
        switchMap(action =>
            Observable.create(observer => {
                api.auth
                    .getSchoolTeachingList(action.payload)
                    .then(res => {
                        if (res.success) {
                            observer.next(getSchoolTeachingSuccess(res))
                        }
                    })
                    .catch(error => {
                        observer.next(
                            setMsg({
                                type: 'schoolTeachingMsg',
                                message: error.message,
                            })
                        )
                    })
            })
        )
    )

const editSchoolTeachingepic = action$ =>
    action$.pipe(
        ofType(editSchoolTeaching),
        switchMap(action =>
            Observable.create(observer => {
                api.auth
                    .editSchools(action.payload)
                    .then(res => {
                        if (res.success) {
                            observer.next(editSchoolTeachingSuccess(res.data))
                            let data = {
                                page: 1,
                                limit: 10,
                                field: 'create_time',
                                order: 'desc',
                            }
                            observer.next(getSchoolTeaching(data))
                        }
                    })
                    .catch(error => {
                        observer.next(
                            setMsg({
                                type: 'editSchoolTeachingMsg',
                                message: error.message,
                            })
                        )
                    })
            })
        )
    )

const addSchoolTeachingepic = action$ =>
    action$.pipe(
        ofType(addSchoolTeaching),
        switchMap(action =>
            Observable.create(observer => {
                api.auth
                    .addSchools(action.payload)
                    .then(res => {
                        if (res.success) {
                            observer.next(addSchoolTeachingSuccess(res.data))
                            let data = {
                                page: 1,
                                limit: 10,
                                field: 'create_time',
                                order: 'desc',
                            }
                            observer.next(getSchoolTeaching(data))
                        }
                    })
                    .catch(error => {
                        observer.next(
                            setMsg({
                                type: 'addSchoolTeachingMsg',
                                message: error.message,
                            })
                        )
                    })
            })
        )
    )
const provinceEpic = action$ =>
    action$.pipe(
        ofType(getProvince),
        switchMap(action =>
            Observable.create(observer => {
                api.auth
                    .getRegionRanges(action.payload)
                    .then(res => {
                        if (res.success) {
                            observer.next(getProvinceSuccess(res.data))
                        }
                    })
                    .catch(error => {
                        observer.next(
                            setMsg({
                                type: 'provinceMsg',
                                message: error.message,
                            })
                        )
                    })
            })
        )
    )
const cityEpic = action$ =>
    action$.pipe(
        ofType(getCity),
        switchMap(action =>
            Observable.create(observer => {
                api.auth
                    .getRegionRanges(action.payload)
                    .then(res => {
                        if (res.success) {
                            observer.next(getCitySuccess(res.data))
                        }
                    })
                    .catch(error => {
                        observer.next(
                            setMsg({
                                type: 'cityMsg',
                                message: error.message,
                            })
                        )
                    })
            })
        )
    )
const areaEpic = action$ =>
    action$.pipe(
        ofType(getArea),
        switchMap(action =>
            Observable.create(observer => {
                api.auth
                    .getRegionRanges(action.payload)
                    .then(res => {
                        if (res.success) {
                            observer.next(getAreaSuccess(res.data))
                        }
                    })
                    .catch(error => {
                        observer.next(
                            setMsg({
                                type: 'areaMsg',
                                message: error.message,
                            })
                        )
                    })
            })
        )
    )

export const schoolActions = {
    getSchoolTeaching, //获取学校列表
    editSchoolTeaching, //编辑学校教务信息
    addSchoolTeaching, //新增学校教务信息
    getProvince, //获取省
    getCity, //获取市
    getArea, //获取区
    setMsg,
    clearMsg,
}

export const schoolEpic = combineEpics(
    epic,
    editSchoolTeachingepic,
    addSchoolTeachingepic,
    provinceEpic,
    cityEpic,
    areaEpic
)

const schoolReducer = handleActions(
    {
        [getSchoolTeaching]: state => ({
            ...state,
            isSchoolTeaching: true,
        }),
        [getSchoolTeachingSuccess]: (state, action) => ({
            ...state,
            schoolTeachingData: action.payload.data ? action.payload.data : [],
            schoolTeachingPageData: action.payload.page,
            isSchoolTeaching: false,
            schoolTeachingReady: true,
        }),
        [getSchoolTeachingFailed]: state => ({
            ...state,
            isSchoolTeaching: false,
        }),
        [editSchoolTeaching]: state => ({
            ...state,
            isEditSchoolTeaching: true,
        }),
        [editSchoolTeachingSuccess]: (state, action) => ({
            ...state,
            editSchoolTeachingData: action.payload,
            isEditSchoolTeaching: false,
            editSchoolTeachingReady: true,
        }),
        [editSchoolTeachingFailed]: state => ({
            ...state,
            isEditSchoolTeaching: false,
        }),
        [addSchoolTeaching]: state => ({
            ...state,
            isAddSchoolTeaching: true,
        }),
        [addSchoolTeachingSuccess]: (state, action) => ({
            ...state,
            AddSchoolTeachingData: action.payload,
            isAddSchoolTeaching: false,
            addSchoolTeachingReady: true,
        }),
        [addSchoolTeachingFailed]: state => ({
            ...state,
            isAddSchoolTeaching: false,
        }),
        [getProvince]: state => ({
            ...state,
            isProvince: true,
        }),
        [getProvinceSuccess]: (state, action) => ({
            ...state,
            provinceData: action.payload ? action.payload : [],
            isProvince: false,
            provinceReady: true,
        }),
        [getProvinceFailed]: state => ({
            ...state,
            isProvince: false,
        }),
        [getCity]: state => ({
            ...state,
            isCity: true,
        }),
        [getCitySuccess]: (state, action) => ({
            ...state,
            cityData: action.payload ? action.payload : [],
            isCity: false,
            cityReady: true,
        }),
        [getCityFailed]: state => ({
            ...state,
            isCity: false,
        }),
        [getArea]: state => ({
            ...state,
            isArea: true,
        }),
        [getAreaSuccess]: (state, action) => ({
            ...state,
            areaData: action.payload ? action.payload : [],
            isArea: false,
            areaReady: true,
        }),
        [getAreaFailed]: state => ({
            ...state,
            isArea: false,
        }),
        [setMsg]: (state, action) => ({
            ...state,
            [action.payload.type]: action.payload.message,
        }),
        [clearMsg]: (state, action) => ({
            ...state,
            [action.payload.type]: '',
        }),
    },
    {
        isSchoolTeaching: false,
        schoolTeachingReady: false,
        schoolTeachingData: [],
        schoolTeachingPageData: {},
        isEditSchoolTeaching: false,
        editschoolTeachingReady: false,
        editschoolTeachingData: [],
        isEditSchoolTeaching: false,
        editschoolTeachingReady: false,
        editschoolTeachingData: [],
        isProvince: false,
        provinceReady: false,
        provinceData: [],
        isCity: false,
        cityReady: false,
        cityData: [],
        isArea: false,
        areaReady: false,
        areaData: [],
    }
)

export default schoolReducer
