const initialState = {
    user: 'nobody yet'
}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'GET_USER':
            return {
                user: action.payload
            }
        default:
            return state
    }
}