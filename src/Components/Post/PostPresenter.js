import React from 'react';
import styled from 'styled-components';
import TextareaAutosize from 'react-autosize-textarea'
import FatText from './FatText';
import Avatar from '../Avatar';
import { HeartFull, HeartEmpty, Comment as CommentIcon } from '../Icons';

const Post = styled.div`
    ${props=> props.theme.whiteBox};
    width: 100%;
    max-width: 600px;
    margin-bottom: 25px;
    user-select: none;
`

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

const Files = styled.div`
    position: relative;
    padding-bottom: 100%;
`

const File = styled.img`
    max-width: 100%;
    height: 600px;
    width: 100%;
    position: absolute;
    top: 0;
    display: block;
    object-fit: cover;
    opacity: ${props=> (props.showing? 1:0)};
    transition: opacity .5s linear;
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
    user:{username, avatar}, 
    location,
    files, 
    isLiked, 
    likeCount, 
    createdAt, 
    newComment, 
    currentItem,
    toggleLike,
    comments,
    onKeyPress,
    selfComments
}) => (
    <Post>
        <Header>
            <Avatar size="sm" url={avatar} />
            <UserColumn>
                <FatText text={username} />
                <Location>{location}</Location> 
            </UserColumn>
        </Header>
        <Files>
            { files && files.map((file, index) => <File id={file.id} src={file.url} key={file.id} showing={index===currentItem}  /> ) }
        </Files>
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
    </Post>
)