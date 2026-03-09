const wishlistReducer = (state, action) => {
    switch(action.type){
        case "Add":
            return [...state, action.payload]
        case "Remove":
            return state.filter(item => item.id !== action.payload.id)
        case "Clear":
            return []
            default:
                return state

    }
}
export default wishlistReducer