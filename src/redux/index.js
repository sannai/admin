import { combineEpics } from 'redux-observable'
import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import user, { userEpic, userActions } from './user'
import account, { accountEpic, accountActions } from './account'
import school, { schoolEpic, schoolActions } from './school'

export const rootEpic = combineEpics(userEpic, accountEpic, schoolEpic)

export const actions = {
    user: userActions,
    account: accountActions,
    school: schoolActions,
}

export const rootReducer = history =>
    combineReducers({
        router: connectRouter(history),
        user,
        account,
        school,
    })
