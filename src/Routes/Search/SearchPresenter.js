import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import FatText from '../../Components/Post/FatText';
import Loader from '../../Components/Loader';
import UserCard from '../../Components/UserCard';
import SquarePost from '../../Components/SquarePost'

const Wrapper = styled.div`
    min-height: 50vh;
`;

const Section = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 25px;
    margin-bottom: 50px;
`;

const PostSection = styled(Section)`

`

const SearchPresenter = ({ searchTerm, data, loading }) => {
    if (searchTerm === undefined) {
        return (
            <Wrapper>
                <FatText text="Search for something" />
            </Wrapper>
        ) 
    } else if ( loading === true ) {
        return (
            <Wrapper>
                <Loader />
            </Wrapper>
        )
    } else if ( data && data.searchUser && data.searchPost ) {
        return <Wrapper>
            <Section>
                { data.searchUser.length === 0 
                    ? <FatText text={"No users found"} /> 
                    : data.searchUser.map( user => (
                        <UserCard 
                            key={user.id}
                            id={user.id}
                            username={user.username} 
                            isFollowing={user.isFollowing}
                            url={user.avatar}
                            isSelf={user.isSelf}
                        />
                    ))
                }
            </Section>
            <PostSection>
                { data.searchPost.length === 0 
                    ? <FatText text={"No posts found"} /> 
                    : data.searchPost.map( post => (
                        <SquarePost
                            idOfPost={post.id} 
                            key={post.id}
                            likeCount={post.likeCount} 
                            commentCount={post.commentCount}    
                            file={post.files[0]}
                        />
                    ))
                }
            </PostSection>
        </Wrapper>
    }
    
} 

SearchPresenter.propTypes = {
    searchTerm: PropTypes.string,
    loading: PropTypes.bool,
}

export default SearchPresenter;