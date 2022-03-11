import { useState, useEffect } from "react";

/*
    自定义 hook： 命名必须以 use 开始
*/

function useScrollY() {

    const [y, setY] = useState(window.scrollY);

    useEffect(() => {
        console.log('effect');
        setY(window.scrollY);
        window.onscroll = () => {
            setY(window.scrollY);
        }
        return () => {
            console.log('effect end');
            window.onscroll = null;
        }
    }, [])

    return y;
}

export { useScrollY };