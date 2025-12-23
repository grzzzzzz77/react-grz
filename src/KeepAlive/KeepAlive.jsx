import { useReducer } from "react";
import { keepAliveReducer } from "./KeepAliveReducer";
import { KeepAliveContext } from "./KeepAliveContext";
import { CREATING, CREATED } from "./actionTypes";
import { useCallback } from "react";

function KeepAlive(props) {
  const [keepAliveStates, dispatch] = useReducer(keepAliveReducer, {});
  const setKeepAliveState = useCallback(
    ({ reactElement, keepAliveId }) => {
      if (!keepAliveStates[keepAliveId]) {
        dispatch({
          type: CREATING,
          payload: {
            keepAliveId,
            reactElement,
          },
        });
      }
    },
    [keepAliveStates]
  );
  return (
    <KeepAliveContext.Provider
      value={{ setKeepAliveState, keepAliveStates, dispatch }}
    >
      {props.children}
      {Object.keys(keepAliveStates).map((keepAliveId) => {
        const state = keepAliveStates[keepAliveId];
        return (
          <div
            key={keepAliveId}
            ref={(node) => {
              if (node && !state.nodes) {
                dispatch({
                  type: CREATED,
                  payload: {
                    keepAliveId,
                    nodes: [...node.childNodes],
                  },
                });
              }
            }}
          >
            {state.reactElement}
          </div>
        );
      })}
    </KeepAliveContext.Provider>
  );
}

export default KeepAlive;
