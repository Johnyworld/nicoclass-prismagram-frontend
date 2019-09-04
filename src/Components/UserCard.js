import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Avatar from './Avatar';
import FatText from './Post/FatText';
import Button from './Button';

const Card = styled.div`
    ${props=> props.theme.whiteBox};
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
`

const ExtendedAvatar = styled(Avatar)`
    margin-bottom: 10px;
`;

const ExtendedLink = styled(Link)`
    color: inherit;
    margin-bottom: 10px;
`;

const UserCard = ({ username, isFollowing, url, isSelf }) => (
    <Card>
        <ExtendedAvatar url={url} size={'md'} />
        <ExtendedLink to={`/${username}`}>
            <FatText text={username} />
        </ExtendedLink> 
        { !isSelf && <Button text={isFollowing ? "Unfollow" : "Follow"} /> }
    </Card>    
) 

UserCard.propTypes = {
    username : PropTypes.string.isRequired,
    isFollowing : PropTypes.bool.isRequired,
    url : PropTypes.string.isRequired,
    isSelf : PropTypes.bool.isRequired
}
 
export default UserCard;