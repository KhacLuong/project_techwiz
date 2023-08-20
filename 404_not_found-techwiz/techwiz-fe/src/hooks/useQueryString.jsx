import {useMemo} from "react";
import {useLocation} from "react-router-dom";
import qs from "query-string";

function useQueryString() {
    const location = useLocation();
    return useMemo(
        () => qs.parse(location.search),
        [location.search]
    ); // { page: 1, search: 'deptrai', filter: 'male' }
}

export default useQueryString;