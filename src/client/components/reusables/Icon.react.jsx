import React from 'react';

function Icon(props) {
  return (
    <i className={`fa ${props.name}`} aria-hidden="true" />
  );
}

Icon.propTypes = {
  name: React.PropTypes.string.isRequired,
};

export default Icon;
