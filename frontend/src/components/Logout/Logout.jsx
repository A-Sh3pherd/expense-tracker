import React, {useEffect} from 'react';
import {useHistory} from 'react-router-dom'

const Logout = ({setLoggedInUser}) => {
    //useHistory HOOK
    const history = useHistory();
    useEffect(() => {
        localStorage.clear();
        setLoggedInUser(false)
        history.push('/');
    }, [])

    return (
        <>

        </>
    );
};

export default Logout;