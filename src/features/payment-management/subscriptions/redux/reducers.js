// tsubscriptionsReducer.js
const initialState = {
    subscriptions: [],
    loading: false
};

const subscriptionsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_SUBSCRIPTIONS':
            return {
                ...state,
                subscriptions: action.payload,
                loading: false
            };
        // Add other cases as needed
        default:
            return state;
    }
};

export const updateSubscriptions = (subscriptions) => ({
    type: 'UPDATE_SUBSCRIPTIONS',
    payload: subscriptions
});

export default subscriptionsReducer;
