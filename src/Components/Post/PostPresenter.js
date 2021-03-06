import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import TextareaAutosize from 'react-autosize-textarea'
import FatText from './FatText';
import Avatar from '../Avatar';
import { HeartFull, HeartEmpty, Comment as CommentIcon } from '../Icons';
import SquarePhoto from '../SquarePhoto';

const Post = styled.div`
    ${props=> props.theme.whiteBox};
    width: 100%;
    max-width: 600px;
    margin-bottom: 25px;
    user-select: none;
    a { 
        color: inherit;
    }
`

const SectionLeft = styled.section`
    flex: 1 1 335px;
`;

const SectionRight = styled.section`
    ${props=> props.theme.whiteBox};
    display: flex;
    flex-direction: column;
    flex: 0 0 335px;
    justify-content: space-between;
`;

const Header = styled.header`
    padding: 15px;
    display: flex;
    align-items: center;
`

const UserColumn = styled.div`
    margin-left: 10px;
`

const Location = styled.span`
    display: block;
    margin-top: 5px;
    font-size: 12px;
`

const Button = styled.span`
    cursor: pointer;
`

const Meta = styled.div`
    padding: 15px;
`
const Buttons = styled.div`
    ${Button} {
        &:first-child {
            margin-right: 10px;
        }
    }
    margin-bottom: 10px;
`

const TimeStamp = styled.span`
    font-weight: 300;
    text-transform: uppercase;
    opacity: .5;
    display: block;
    margin: 10px 0;
    font-size: 12px;
    padding-bottom: 10px;
    border-bottom: 1px solid ${props=> props.theme.lightGrayColor};
`

const Textarea = styled(TextareaAutosize)`
    border: none;
    width: 100%;
    resize: none;
    font-size: 14px;
    &:focus {
        outline: none;
    }
`
const Comments = styled.ul`
    margin-top: 10px;
`

const Comment = styled.li`
    margin-bottom: 7px;
    span {
        margin-right: 5px;
    }
`
        
export default ({ 
    isDetail,
    user:{username, avatar}, 
    location,
    files, 
    isLiked, 
    likeCount, 
    createdAt, 
    newComment, 
    toggleLike,
    comments,
    onKeyPress,
    selfComments
}) => {
    console.log(isDetail)
    if ( !isDetail ) {
        return (
            <Post>
                <HeaderContainer avatar={avatar} username={username} location={location} />
                <SquarePhoto files={files} />
                <MetaContainer 
                    selfComments={selfComments} 
                    createdAt={createdAt} 
                    newComment={newComment} 
                    onKeyPress={onKeyPress}
                    isLiked={isLiked}
                    likeCount={likeCount}
                    comments={comments}
                    toggleLike={toggleLike}
                />
            </Post>
        )
    } else {
        return (
            <>
            <SectionLeft>
                <SquarePhoto files={files} />
            </SectionLeft>
            <SectionRight>
                <HeaderContainer avatar={avatar} username={username} location={location} />
                <MetaContainer 
                    selfComments={selfComments} 
                    createdAt={createdAt} 
                    newComment={newComment} 
                    onKeyPress={onKeyPress}
                    isLiked={isLiked}
                    likeCount={likeCount}
                    comments={comments}
                    toggleLike={toggleLike}
                />
            </SectionRight>
            </>
        )
    }
} 

const HeaderContainer = ({ avatar, username, location }) => (
    <Header>
        <Avatar size="sm" url={avatar} />
        <UserColumn>
            <Link to={`/${username}`}>
                <FatText text={username} />
            </Link>
            <Location>{location}</Location> 
        </UserColumn>
    </Header>
)

const MetaContainer = ({ selfComments, createdAt, newComment, onKeyPress, isLiked, likeCount, comments, toggleLike }) => (
    <Meta>
        <Buttons>
            <Button onClick={toggleLike}>
                { isLiked ? <HeartFull /> : <HeartEmpty /> }
            </Button>
            <Button>
                <CommentIcon />
            </Button>
        </Buttons> 
        <FatText text={likeCount === 1 ? '1 like' : `${likeCount} likes`} />
        { comments && ( 
            <Comments>
                { comments.map(comment=> (
                    <Comment key={comment.id}>
                        <FatText text={ comment.user.username } />
                        { comment.text }
                    </Comment>  
                ))}
                { selfComments.map(comment=> (
                    <Comment key={comment.id}>
                        <FatText text={ comment.user.username } />
                        { comment.text }
                    </Comment>  
                ))}
            </Comments> 
        )}
        <TimeStamp>
            {createdAt}
        </TimeStamp>
        <form>
            <Textarea 
                placeholder={"Add a comment..."} 
                value={newComment.value}
                onChange={newComment.onChange}
                onKeyPress={onKeyPress} 
            />
        </form>
    </Meta>
)