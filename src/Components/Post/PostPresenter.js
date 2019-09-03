import React from 'react';
import styled from 'styled-components';
import TextareaAutosize from 'react-autosize-textarea'
import FatText from './FatText';
import Avatar from '../Avatar';
import { HeartFull, HeartEmpty, Comment } from '../Icons';

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

export default ({ 
    user:{username, avatar}, 
    location, 
    files, 
    isLiked, 
    likeCount, 
    createdAt, 
    newComment, 
    currentItem,
    toggleLike
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
                    <Comment />
                </Button>
            </Buttons> 
            <FatText text={likeCount === 1 ? '1 like' : `${likeCount} likes`} />
            <TimeStamp>
                {createdAt}
            </TimeStamp>
            <Textarea placeholder={"Add a comment..."} {...newComment} />
        </Meta>
    </Post>
)