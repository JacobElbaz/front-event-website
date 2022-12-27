import axios from 'axios';

const url = 'https://backend-event-app.adaptable.app'

export function getGuests() {
    return new Promise(resolve => {
        axios.get(url+"/guests")
        .then(res => res.status === 200 && res.data)
        .then(resolve)
        .catch(console.error)
    })
}

export function insertGuest(body) {
    return new Promise(resolve => {
        axios.post(url+"/guests/insert", body)
        .then(res => res.status === 200 && res.data)
        .then(resolve)
        .catch(console.err)
    })
}

export function putGuest(body) {
    return new Promise(resolve => {
        axios.put(url+"/guests/" + body._id, body)
        .then(res => res.status === 200 && res.data)
        .then(resolve)
        .catch(console.err)
    })
}
export function dropGuest(body) {
    return new Promise(resolve => {
        axios.delete(url+"/guests/" + body._id, body)
        .then(res => res.status === 200 && res.data)
        .then(resolve)
        .catch(console.err)
    })
}