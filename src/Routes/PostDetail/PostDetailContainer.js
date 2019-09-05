import React from 'react';
import { withRouter } from 'react-router-dom';
import { useQuery } from 'react-apollo-hooks';
import { POST_DETAIL } from './PostDetailQueries';
import styled from 'styled-components';
import Loader from '../../Components/Loader';

const Wrapper = styled.div`

`;

export default withRouter(props => {
    const { match : { params : { idOfPost: id }}} = props;
    const { data, loading } = useQuery( POST_DETAIL, { variables: { id } });
    console.log(data, loading);
    return (
        <Wrapper>
            {loading && <Loader />}
            {!loading && data && data.seeFullPost && "We Have Full Post."}
        </Wrapper>
    )
})