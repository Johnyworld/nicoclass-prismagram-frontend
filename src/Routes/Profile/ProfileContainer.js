import React from 'react';
import { withRouter } from 'react-router-dom';
import { useQuery, useMutation } from 'react-apollo-hooks';
import { GET_USER, LOG_OUT } from './ProfileQueries';
import ProfilePresenter from './ProfilePresenter';

export default withRouter(props => {
    const { match : { params : { username }}} = props;
    const { data, loading } = useQuery( GET_USER, { variables: { username } });
    console.log(data, loading);
    const [logOut] = useMutation( LOG_OUT );
    return <ProfilePresenter data={data} logOut={logOut} loading={loading} /> 
});