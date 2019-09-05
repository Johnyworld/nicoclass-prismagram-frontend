import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { HeartFull, CommentFull } from './Icons';

const Overlay = styled.div`
    position: absolute;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba( 0, 0, 0, .3 );
    opacity: 0;
    transition: opacity .3s linear;
    svg {
        fill: white;
    }
`;

const Container = styled.div`
    position: relative;
    background-image: url( ${props=> props.bg} );
    background-size: cover;
    padding-bottom: 100%;
    &:hover {
        ${Overlay} {
            opacity: 1;
        }
    }
`;

const Number = styled.div`
    color: white;
    display: flex;
    align-items: center;
    &:first-child {
        margin-right: 15px;
    }
`;

const NumberText = styled.span`
    margin-left: 8px;
    font-size: 16px;
`;

const SquarePost = ({ likeCount, commentCount, file, idOfPost }) => {
    return (
        <Link to={`/p/${idOfPost}`}>
            <Container bg={file.url}> {/* bg는 styled-component에 props 로 전달함. */}
                <Overlay>
                    <Number>
                        <HeartFull /><NumberText>{likeCount}</NumberText>
                    </Number>
                    <Number>
                        <CommentFull /><NumberText>{commentCount}</NumberText>
                    </Number>
                </Overlay>
            </Container>
        </Link>
    )    
}

SquarePost.propTypes = {
    likeCount : PropTypes.number.isRequired,
    commentCount : PropTypes.number.isRequired,
}

export default SquarePost;