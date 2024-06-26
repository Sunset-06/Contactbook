import axios from "axios"
const baseUrl = '/api/contacts';

const getContacts = () =>{
    return axios
        .get(baseUrl)
}

const newContact = (newContact) => {
    return axios
        .post(baseUrl, newContact)
}

const deleteContact = (delId) => {
    return axios
        .delete(`${baseUrl}/${delId}`)
}

export default {
    getContacts,
    newContact,
    deleteContact  
} 