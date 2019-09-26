import { switchMap } from 'rxjs/operators'
import { Observable } from 'rxjs'
import { ofType, combineEpics } from 'redux-observable'
import { handleActions, createActions } from 'redux-actions'
import api from '../api'

const {
    getAccount,
    getAccountSuccess,
    getAccountFailed,
    editAdmins,
    editAdminsSuccess,
    editAdminsFailed,
    addAdmins,
    addAdminsSuccess,
    addAdminsFailed,
    setMsg,
    clearMsg,
} = createActions(
    'get_account',
    'get_account_success',
    'get_account_failed',
    'edit_admins',
    'edit_admins_success',
    'edit_admins_failed',
    'add_admins',
    'add_admins_success',
    'add_admins_failed',
    'set_msg',
    'clear_msg'
)

const epic = action$ =>
    action$.pipe(
        ofType(getAccount),
        switchMap(action =>
            Observable.create(observer => {
                api.auth
                    .getAdminList(action.payload)
                    .then(res => {
                        if (res.success) {
                            observer.next(getAccountSuccess(res))
                        }
                    })
                    .catch(error => {
                        observer.next(
                            setMsg({
                                type: 'accountMsg',
                                message: error.message,
                            })
                        )
                    })
            })
        )
    )
const editAdminsEpic = action$ =>
    action$.pipe(
        ofType(editAdmins),
        switchMap(action =>
            Observable.create(observer => {
                api.auth
                    .editAdmins(action.payload)
                    .then(res => {
                        if (res.success) {
                            observer.next(editAdminsSuccess(res.data))
                            let data = {
                                page: 1,
                                limit: 10,
                                field: 'create_time',
                                order: 'desc',
                            }
                            observer.next(getAccount(data))
                        }
                    })
                    .catch(error => {
                        observer.next(
                            setMsg({
                                type: 'editAdminsMsg',
                                message: error.message,
                            })
                        )
                    })
            })
        )
    )

const addAdminsEpic = action$ =>
    action$.pipe(
        ofType(addAdmins),
        switchMap(action =>
            Observable.create(observer => {
                api.auth
                    .addAdmins(action.payload)
                    .then(res => {
                        if (res.success) {
                            observer.next(addAdminsSuccess(res.data))
                            let data = {
                                page: 1,
                                limit: 10,
                                field: 'create_time',
                                order: 'desc',
                            }
                            observer.next(getAccount(data))
                        }
                    })
                    .catch(error => {
                        observer.next(
                            setMsg({
                                type: 'addAdminsMsg',
                                message: error.message,
                            })
                        )
                    })
            })
        )
    )

export const accountActions = {
    getAccount, //获取账号列表
    editAdmins, //编辑账号信息
    addAdmins, //新增账号信息
    setMsg,
    clearMsg,
}

export const accountEpic = combineEpics(epic, editAdminsEpic, addAdminsEpic)

const accountReducer = handleActions(
    {
        [getAccount]: state => ({
            ...state,
            isAccount: true,
        }),
        [getAccountSuccess]: (state, action) => ({
            ...state,
            accountData: action.payload.data ? action.payload.data : [],
            accountPageData: action.payload.page,
            isAccount: false,
            accountReady: true,
        }),
        [getAccountFailed]: state => ({
            ...state,
            isAccount: false,
        }),
        [editAdmins]: state => ({
            ...state,
            isAdmins: true,
        }),
        [editAdminsSuccess]: (state, action) => ({
            ...state,
            adminsData: action.payload,
            isAdmins: false,
            adminsReady: true,
        }),
        [editAdminsFailed]: state => ({
            ...state,
            isAdmins: false,
        }),
        [addAdmins]: state => ({
            ...state,
            isAddAdmins: true,
        }),
        [addAdminsSuccess]: (state, action) => ({
            ...state,
            addAdminsData: action.payload,
            isAddAdmins: false,
            addadminsReady: true,
        }),
        [addAdminsFailed]: state => ({
            ...state,
            isAddAdmins: false,
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
        isAccount: false,
        accountReady: false,
        accountData: [],
        accountPageData: {},
        isAdmins: false,
        adminsReady: false,
        adminsData: {},
        isAddAdmins: false,
        addadminsReady: false,
        addAdminsData: {},
    }
)

export default accountReducer
