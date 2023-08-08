import {useEffect, useRef} from "react";

export default function useOutsideClick(handle, listenerCapture = true) {
    const ref = useRef();
    useEffect(() => {
        function handleClick(e) {
            if (ref.current && !ref.current.contains(e.target)) return handle()
        }

        document.addEventListener("click", handleClick, listenerCapture);
        return (() => document.removeEventListener("click", handleClick, listenerCapture))

    }, [handle, listenerCapture]);
    return ref;
}