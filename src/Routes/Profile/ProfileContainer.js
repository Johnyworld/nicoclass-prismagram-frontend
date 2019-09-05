import React from 'react';
import { withRouter } from 'react-router-dom';
import { useQuery } from 'react-apollo-hooks';
import { GET_USER } from './ProfileQueries';
import ProfilePresenter from './ProfilePresenter';

export default withRouter(props => {
    const { match : { params : { username }}} = props;
    const { data, loading } = useQuery( GET_USER, { variables: { username } });
    return <ProfilePresenter data={data} loading={loading} /> 
});