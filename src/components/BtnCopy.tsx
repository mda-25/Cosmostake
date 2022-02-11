import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Button } from 'react-bootstrap';
import { Files } from 'react-bootstrap-icons';
import { toast } from 'react-toastify';

interface IBtnCopy {
    textToCopy: string;
}

const copy = () => toast.success('Copy');

const BtnCopy = ({ textToCopy }: IBtnCopy) => {
    return (
        <CopyToClipboard text={textToCopy}>
            <Button variant="link" onClick={copy}>
                <Files style={{ verticalAlign: 'baseline' }} />
            </Button>
        </CopyToClipboard>
    );
};

export default BtnCopy;
