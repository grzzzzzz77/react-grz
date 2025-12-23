import React, { useRef, useContext, useEffect } from "react";
import { KeepAliveContext } from "./KeepAliveContext";

function keepAliveTransfer(KeepAliveComponent: any, keepAliveId: string) {
  return function (props: any) {
    const { keepAliveStates, setKeepAliveState } = useContext(KeepAliveContext);
    const _ref: any = useRef(null);

    useEffect(() => {
      const state = keepAliveStates[keepAliveId];
      if (state && state.nodes) {
        state.nodes.forEach((node: any) => {
          _ref.current.appendChild(node);
        });
      } else {
        setKeepAliveState({
          reactElement: <KeepAliveComponent {...props} />,
          keepAliveId,
        });
      }
    }, [keepAliveStates, setKeepAliveState, props]);

    return (
      <>
        <div ref={_ref}></div>
      </>
    );
  };
}

export default keepAliveTransfer;
