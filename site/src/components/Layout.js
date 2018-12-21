import PropTypes from 'prop-types';
import React from 'react';

const Layout = ({ children }) => <div className="font-sans antialiased">{children}</div>;

Layout.propTypes = { children: PropTypes.node.isRequired };

export default Layout;
