import React from 'react';
import styled from 'styled-components';
import Helmet from 'react-helmet';
import Loader from '../../Components/Loader';
import Avatar from '../../Components/Avatar';
import FatText from '../../Components/Post/FatText';
import FollowButton from '../../Components/FollowButton';
import SquarePost from '../../Components/SquarePost';
import Button from '../../Components/Button';

const Wrapper = styled.div`
    min-height: 100vh;
`;

const Header = styled.header`
    display: flex;
    margin: 0 auto;
    align-items: center;
    justify-content: space-around;
    margin-bottom: 50px;
    padding-bottom: 50px;
    border-bottom: ${props=> props.theme.boxBorder};
`;

const HeaderColumn = styled.div`
    > *:not(:last-child) {
        margin-bottom: 10px;
    }
    &:last-child {
        width: 50%;
    }
`;

const UsernameRow = styled.div`
    display: flex;
    justify-content: start;
    align-items: center;
`;

const Username = styled.span`
    display: block; 
    font-size: 26px;
    margin-right: 50px;
`

const Counts = styled.ul`
    display: flex;
`;

const Count = styled.li`
    font-size: 16px;
    &:not(:last-child) {
        margin-right: 10px;
    }
`;

const FullName = styled(FatText)`
    font-size: 16px;
    display: block;
`;

const Bio = styled.p`
`;

const Posts = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 25px;
`


export default ({ loading, data, logOut }) => {
    if ( loading ) {
        return (
            <Wrapper>
                <Loader />
            </Wrapper>
        )
    } else if ( !loading && data && data.seeUser ) {
        const { seeUser : {
            id,
            avatar,
            username,
            fullName,
            isFollowing,
            isSelf,
            bio,
            followingCount,
            followersCount,
            postsCount,
            posts
        }} = data;
        return (
        <Wrapper>
            <Helmet>
                <title>{username} | Prismagram</title>
            </Helmet>
            <Header>
                <HeaderColumn>
                   <Avatar size="lg" url={avatar} />
                </HeaderColumn>
                <HeaderColumn>
                    <UsernameRow>
                        <Username>{username}</Username>
                        { isSelf ? <Button onClick={logOut} text={"Logout"} /> : <FollowButton id={id} isFollowing={isFollowing} />  }
                    </UsernameRow>
                    <Counts>
                       <Count><FatText text={String(postsCount)} /> posts</Count>
                       <Count><FatText text={String(followersCount)} /> followers</Count>
                       <Count><FatText text={String(followingCount)} /> following</Count>
                    </Counts>
                    <FullName text={fullName} />
                    <Bio>{bio}</Bio>
                </HeaderColumn>
            </Header> 
            <Posts>
                {posts && posts.map(post=> (
                    <SquarePost
                        idOfPost={post.id}
                        key={post.id}
                        likeCount={post.likeCount} 
                        commentCount={post.commentCount}    
                        file={post.files[0]}
                    />
                ))}
            </Posts>
        </Wrapper>
        )
    }
    return null;
};