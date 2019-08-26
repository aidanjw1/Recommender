import React from 'react';

const Layout = ({ children }) => {
    return (
        <>
            <div style={{backgroundColor: 'black', width: '100%'}}>
                <img src='/title.png' height={150} width={400} />
            </div>
            {children}
        </>
    )
}

export default Layout;