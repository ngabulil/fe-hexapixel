import { createData } from "./api"

export const apiLogin = async (data) => {
    try {
        const response = await createData('/users/login', data)
        return response
    } catch (error) {
        console.log(error)
        throw error
    }
}