import {
    API
} from '../config'

// cors mode to allow cross-origin 
export const signup = (user) => {
    return fetch(`${API}/signup`, {
            method: "POST",
            mode: 'cors',
            headers: {
                Accept: 'application/json',
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
        .then(response => {
            return response.json()
        })

};



// mode cors to allow cross-origin access
export const signin = (user) => {
    return fetch(`${API}/signin`, {
            method: "POST",
            mode: 'cors',
            headers: {
                Accept: 'application/json',
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
        .then(response => {
            return response.json()
        })

}
export const authenticate = (data, next) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('jwt', JSON.stringify(data))
        next()
    }
}

export const signout = next => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('jwt')
        next()
        return fetch(`${API}/signout`, {
                method: 'GET',
            })
            .then(response => {
                console.log('signout', response)
            })
            .catch(err => console.log(err))
    }
}

export const isAuthenticated = () => {
    if (typeof window == 'undefined') {
        return false
    }
    if (localStorage.getItem('jwt')) {
        return JSON.parse(localStorage.getItem('jwt'))
    } else {
        return false
    }
}