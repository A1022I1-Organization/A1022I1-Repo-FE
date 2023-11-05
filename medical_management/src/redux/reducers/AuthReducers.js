import { LOG_IN, LOG_OUT } from "../Type";

export const authReducer = (state = [], action) => {
    const { type, payload } = action;
  
    switch (type) {
      case LOG_IN:
        return payload;
      case LOG_OUT:
        return payload;
      default:
        return state;
    }
  };