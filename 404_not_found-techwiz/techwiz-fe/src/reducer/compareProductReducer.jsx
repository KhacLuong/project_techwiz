export const INITIAL_STATE = {
    products: JSON.parse(localStorage.getItem('compareProducts')) || []
}
export const compareProductReducer = (state, action) => {
    switch (action.type) {
        case 'ADD':
            return {
                ...state,
                products: [...state.products, action.payload]
            }
        case 'REMOVE':
            return {
                ...state,
                products: state.products.filter(item => item.id !== action.payload.id)
            }
        case 'REMOVE_ALL_ITEMS':
            return {
                ...state,
                products: []
            }
        default:
            return state;
    }
};