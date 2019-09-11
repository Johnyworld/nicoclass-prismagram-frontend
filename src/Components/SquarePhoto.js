import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Wrapper = styled.div`
    position: relative;
    width: 100%;
    padding-bottom: 100%;
`;

const Photo = styled.img`
    max-width: 100%;
    height: 600px;
    width: 100%;
    position: absolute;
    top: 0;
    display: block;
    object-fit: cover;
    opacity: ${props=> (props.showing? 1:0)};
    transition: opacity .5s linear;
`;

const SquarePhoto = ({ files }) => {
    const [ currentItem, setCurrentItem ] = useState(0);

    useEffect(() => {
        const slide = () => {
            const totalFiles = files.length;
            if (currentItem === totalFiles -1) {
                setTimeout(()=>setCurrentItem(0), 3000);
            } else {
                setTimeout(()=>setCurrentItem(currentItem+1), 3000);
            }
        } 
        slide();
    }, [currentItem, files]);

    return (
        <Wrapper>
            { files && files.map((file, index) =>
                <Photo 
                    id={file.id} 
                    src={file.url} 
                    key={file.id} 
                    showing={index===currentItem}
                /> 
            )}
        </Wrapper>
    )
}

SquarePhoto.propTypes = {
    files: PropTypes.arrayOf( PropTypes.shape({
        id: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired
    }))
}

export default SquarePhoto;