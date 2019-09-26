import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Switch, Route } from 'react-router-dom'
import styled from 'styled-components'
import { actions } from './redux'

import School from './views/school'
import Account from './views/account'
import Header from '../src/components/header'
import PasswordReset from '../src/components/header/PasswordReset'

const MySection = styled.main`
    padding-top: 100px;
    margin: 0 auto;
    width: 1366px;
`

function App(props) {
    useEffect(() => {
        if (!props.isGettingUserInfo && !props.userInfoReady) {
            props.getUserInfo(props.token)
        }
    }, [props.isGettingUserInfo, props.userInfoReady])
    return (
        <>
            <Header />
            <MySection>
                <Switch>
                    <Route path='/password-reset' component={PasswordReset} />
                    <Route path='/school' component={School} />
                    <Route path='/' component={Account} />
                </Switch>
            </MySection>
        </>
    )
}

const mapStateToProps = state => {
    return state.user
}

const mapDispatchToProps = dispatch => bindActionCreators(actions.user, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)
