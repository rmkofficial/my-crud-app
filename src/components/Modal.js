// src/components/Modal.js

import React, { useEffect } from 'react';

function Modal({ isVisible, onClose, children }) {
    useEffect(() => {
        if (isVisible) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isVisible]);

    if (!isVisible) return null;

    const handleOutsideClick = (e) => {
        if (e.target.id === 'modal-overlay') {
            onClose();
        }
    };

    return (
        <div
            id="modal-overlay"
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4"
            onClick={handleOutsideClick}
        >
            <div className="bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-md sm:max-w-lg relative">
                <button
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                    onClick={onClose}
                    style={{ fontSize: '2rem', lineHeight: '1' }}
                >
                    &times;
                </button>
                <div className="p-6">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default Modal;
