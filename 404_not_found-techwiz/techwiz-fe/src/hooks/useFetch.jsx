import { useState, useEffect } from "react";

export default function useFetch(url, options) {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const test = async () => {
            try {
                const resp = await fetch(url, options);
                const res = await resp.json();
                if (isMounted) setData(res.data);
            } catch (e) {
                if (isMounted) setData([]);
                if (isMounted) setError(e);
            }
        };

        let isMounted = true;
        test();
        return () => {
            isMounted = false;
        };
    }, []);

    return { data, error };
}