import React from 'react'
import Alert from 'react-bootstrap/Alert';

export default function ErrorComponent({variant, children}) {
    return (
        <Alert variant={variant || 'info'} style={{textAlign: "center"}}>{children}</Alert>
    );
}
