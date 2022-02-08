import { useState } from 'react';

const useShowModal = () => {
    const [show, setShow] = useState<boolean>(false);

    const handleClose = (): void => setShow(false);
    const handleShow = (): void => setShow(true);

    return {
        show,
        handleClose,
        handleShow,
    };
};

export default useShowModal;
