import axios from 'axios'

const baseURL = '/api/persons'

const getAll = () => {
    const request = axios.get(baseURL)
    return request.then(response => response.data)
}

const addNew = (newRecord) => {
    const request = axios.post(baseURL, newRecord)
    return request.then(response => response.data)
}

const deleteRecord = (id) => {
    const request = axios.delete(`${baseURL}/${id}`)
    return request
}

const update = (id, newRecord) => {
    const request = axios.put(`${baseURL}/${id}`, newRecord)
    return request.then(response => response.data)
}

export default { getAll, addNew, deleteRecord, update }