const suppliesReducer = (supplies = [], action) => {
    const {type, payload} = action;

    switch (type) {
        case "get_all":
            return payload;
        case "delete":
            return [...supplies, payload];
        case "add_supply":
            return [...supplies, payload];
        case "update_supply":
            return [...supplies, payload];
        case "delete_supply":
            return [...supplies,payload];
        default:
            return supplies;
    }
}
export default suppliesReducer;