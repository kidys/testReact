import React from 'react';

export default (props) => {
    const { type, name, onChange } = props;
    return (
        <input type={type} name={name} onChange={onChange}/>
    );
}
