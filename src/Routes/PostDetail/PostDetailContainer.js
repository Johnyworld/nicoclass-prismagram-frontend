import React from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import Helmet from 'react-helmet';
import { useQuery } from 'react-apollo-hooks';
import { POST_DETAIL } from './PostDetailQueries';
import Post from '../../Components/Post';
import Loader from '../../Components/Loader';

const Wrapper = styled.article`
    min-height: 70vh;
    justify-content: center;
    display: flex;
`;

export default withRouter(props => {
    const { match : { params : { idOfPost: id }}} = props;
    const { data, loading } = useQuery( POST_DETAIL, { variables: { id } });
    if ( data ) {
        const { seeFullPost : post } = data;
        console.log(data, post);
    }
    return <Wrapper>
        <Helmet><title>Detail | Prismagram</title></Helmet>
        { loading && <Loader /> }
        { !loading && data && data.seeFullPost &&
            <Post 
                isDetail={"true"}
                key={data.seeFullPost.id} 
                id={data.seeFullPost.id} 
                user={data.seeFullPost.user}
                location={data.seeFullPost.location}
                caption={data.seeFullPost.caption}
                files={data.seeFullPost.files} 
                likeCount={data.seeFullPost.likeCount}
                isLiked={data.seeFullPost.isLiked}
                comments={data.seeFullPost.comments}
                createdAt={data.seeFullPost.createdAt}
            /> 
        }
    </Wrapper>
})