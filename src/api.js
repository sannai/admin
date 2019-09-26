import axios from 'axios'
import Cookies from 'js-cookie'

export const instance = axios.create({
    baseURL: 'http://192.168.0.105:8080/step',
    // baseURL: 'http://192.168.0.120:80',
})
if (Cookies.get('token')) {
    instance.defaults.headers.common['Authorization'] = 'Basic ' + Cookies.get('token')
}

const request = {
    get: async (url, data) => {
        try {
            const res = await instance.get(url, {
                params: data,
            })
            return res.data
        } catch (error) {
            return Promise.reject(error.response.data)
        }
    },
    post: async (url, data) => {
        try {
            const res = await instance.post(url, data)
            return res.data
        } catch (error) {
            return Promise.reject(error.response.data)
        }
    },
    put: async (url, data) => {
        try {
            const res = await instance.put(url, data)
            return res.data
        } catch (error) {
            return Promise.reject(error.response.data)
        }
    },
    del: async url => {
        try {
            const res = await instance.delete(url)
            return res.data
        } catch (error) {
            return Promise.reject(error.response.data)
        }
    },
}

const auth = {
    userInfo: () => request.get('/user-info'),
    logOut: () => request.del('/logout'),
    passwordReset: data => request.put('/password-reset', data),
    getCaptcha: () => request.get('/captchas/base64'),
    getAdminList: data => request.get('/admin-lists', data),
    editAdmins: data => request.put(`/admins/${data.id}`, data),
    addAdmins: data => request.post('/admins', data),
    getSchoolTeachingList: data => request.get('/school-teaching-list', data),
    editSchools: data => request.put(`/schools/${data.id}`, data),
    addSchools: data => request.post('/schools', data),
    getRegionRanges: data => request.get(`/region-ranges/${data.id}`, data),
}

export default {
    auth,
}
