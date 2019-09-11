import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Loader from '../../Components/Loader';
import SquarePhoto from '../../Components/SquarePhoto';
import Avatar from '../../Components/Avatar';
import FatText from '../../Components/Post/FatText';

const Wrapper = styled.article`
    min-height: 70vh;
    justify-content: center;
    display: flex;
`;

const PhotoSection = styled.section`
    flex: 1 1 335px;
`;

const TextSection = styled.section`
    ${props=> props.theme.whiteBox};
    display: flex;
    flex-direction: column;
    flex: 0 0 335px;
    justify-content: space-between;
`;

const Header = styled.header`
    display: flex;
    align-items: center;
    border-bottom: ${props=> props.theme.boxBorder};
    padding: 20px;
    *:first-child {
        margin-right: 10px;
    }
`;

const PostDetailPresenter = ({ data, loading }) => {
    if ( loading ) {
        return (
            <Wrapper>
                <Loader />
            </Wrapper>
        )
    } else if ( !loading && data && data.seeFullPost ) {
        const { seeFullPost : {
            id,
            location,
            caption,
            likeCount,
            comments,
            commentCount,
            isLiked,
            createdAt,
            files,
            user
        }} = data;
        return (
            <Wrapper>
                <PhotoSection>
                    <SquarePhoto files={files} />
                </PhotoSection>
                <TextSection>
                    <Header>
                       <Avatar size="sm" url={user.avatar} />
                       <FatText text={user.username} />
                    </Header>
                    <div>2</div>
                    <div>3</div>
                </TextSection>
            </Wrapper>
        )
    }
}

PostDetailPresenter.propTypes = {
    loading : PropTypes.bool.isRequired
}

export default PostDetailPresenter;