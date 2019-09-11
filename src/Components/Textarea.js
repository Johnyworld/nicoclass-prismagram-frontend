import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Styled from 'styled-components';
import TextareaAutosize from 'react-autosize-textarea'
import useInput from '../Hooks/useInput';

const TextareaInput = styled(TextareaAutosize)`
    border: none;
    width: 100%;
    resize: none;
    font-size: 14px;
    &:focus {
        outline: none;
    }
`

const Textarea = ({ placeholder }) => {
    const comment = useInput("");

    const onKeyPress = async(event) => {
        const { which } = event;
        if ( which === 13 ) {
            event.preventDefault();
            try {
                await 
            } catch {
                toast.error("Can't send comment")
            }
        }
    }

    return (
        <TextareaInput 
            placeholder={placeholder} 
            value={comment.value}
            onChange={comment.onChange}
            onKeyPress={onKeyPress} 
        />
    )
}

Textarea.propTypes = {
    placeholder: PropTypes.string.isRequired
}

export default Textarea;