import React, { useState } from 'react';
import PropTypes from 'prop-types';
import useInput from '../../Hooks/useInput';
import PostPresenter from './PostPresenter';
import { TOGGLE_LIKE, ADD_COMMENT } from './PostQueries';
import { useMutation } from 'react-apollo-hooks';
import { toast } from 'react-toastify';

const PostContainer = ({ 
    isDetail=false,
    id, 
    user, 
    location,
    caption,
    files,
    likeCount,
    isLiked,
    comments,
    createdAt }) => {
        const [ isLikedState, setIsLiked ] = useState(isLiked);
        const [ likeCountState, setLikeCount ] = useState(likeCount);
        const [ selfComments, setSelfComments ] = useState([]);
        const comment = useInput("");

        const [toggleLikeMutation] = useMutation(TOGGLE_LIKE, { 
            variables: { postId: id }
        });

        const [addCommentMutation] = useMutation(ADD_COMMENT, { 
            variables: { postId: id, text: comment.value }
        });
        
        const toggleLike = () => {
            toggleLikeMutation();
            if ( isLikedState === true ) {
                setIsLiked(false);
                setLikeCount(likeCountState-1);
            } else {
                setIsLiked(true);
                setLikeCount(likeCountState+1);
            }
        }

        const onKeyPress = async(event) => {
            const { which } = event;
            if ( which === 13 ) {
                event.preventDefault();
                try {
                    const { data: { addComment }} = await addCommentMutation();
                    setSelfComments([...selfComments, addComment]);
                    comment.setValue("");
                } catch {
                    toast.error("Can't send comment")
                }
            }
        }

        return <PostPresenter
            isDetail={isDetail}
            user={user}
            location={location}
            caption={caption}
            files={files} 
            likeCount={likeCountState}
            isLiked={isLikedState}
            comments={comments}
            createdAt={createdAt}
            newComment={comment}
            setIsLiked={setIsLiked}
            setLikeCount={setLikeCount}
            toggleLike={toggleLike} 
            onKeyPress={onKeyPress}
            selfComments={selfComments}
        />
    }
    

PostContainer.propTypes = {
    id: PropTypes.string.isRequired,
    user: PropTypes.shape({
        id: PropTypes.string.isRequired,
        avatar: PropTypes.string,
        username: PropTypes.string.isRequired
    }).isRequired,
    files: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired 
    })).isRequired,
    likeCount: PropTypes.number.isRequired,
    isLiked: PropTypes.bool.isRequired,
    comments: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        user: PropTypes.shape({
            id: PropTypes.string.isRequired,
            username: PropTypes.string.isRequired
        }).isRequired
    })),
    caption: PropTypes.string,
    location: PropTypes.string,
    createdAt: PropTypes.string.isRequired
}

export default PostContainer;