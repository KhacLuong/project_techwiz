import React, { useLayoutEffect } from 'react'

function useScrollToTop() {
    useLayoutEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, [])
}

export default useScrollToTop