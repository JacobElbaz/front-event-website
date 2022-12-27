import axios from 'axios';

export function getGuests() {
    return new Promise(resolve => {
        axios.get("/guests")
        .then(res => res.status === 200 && res.data)
        .then(resolve)
        .catch(console.error)
    })
}

export function insertGuest(body) {
    return new Promise(resolve => {
        axios.post("/guests/insert", body)
        .then(res => res.status === 200 && res.data)
        .then(resolve)
        .catch(console.err)
    })
}

export function putGuest(body) {
    return new Promise(resolve => {
        axios.put("/guests/" + body._id, body)
        .then(res => res.status === 200 && res.data)
        .then(resolve)
        .catch(console.err)
    })
}
export function dropGuest(body) {
    return new Promise(resolve => {
        axios.delete("/guests/" + body._id, body)
        .then(res => res.status === 200 && res.data)
        .then(resolve)
        .catch(console.err)
    })
}