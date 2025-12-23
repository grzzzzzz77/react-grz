import { CREATING, CREATED } from "./actionTypes";

export function keepAliveReducer(state: any, action: any) {
  const { type, payload } = action;

  const { keepAliveId, reactElement, nodes } = payload;

  switch (type) {
    case CREATING:
      return {
        ...state,
        [keepAliveId]: {
          keepAliveId,
          reactElement,
          nodes: null,
          status: type,
        },
      };
    case CREATED:
      return {
        ...state,
        [keepAliveId]: { ...state[keepAliveId], nodes, status: type },
      };
    default:
      return state;
  }
}
