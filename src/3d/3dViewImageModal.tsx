// src/components/View3DImageModal.tsx
import React from 'react';

interface View3DImageModalProps {
    imageUrl: string | undefined;
    onClose: () => void;
}

const View3DImageModal: React.FC<View3DImageModalProps> = ({ imageUrl, onClose }) => {
    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 100,
            }}
        >
            <div style={{ maxWidth: '80%', maxHeight: '80%', position: 'relative' }}>
                <img
                    src={imageUrl}
                    alt="Apartment"
                    style={{ maxWidth: '100%', maxHeight: '100%' }}
                />
                <div
                    style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        cursor: 'pointer',
                        color: 'white',
                        fontSize: '24px',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        padding: '5px 10px',
                        borderRadius: '4px', 
                        zIndex: 101,
                    }}
                    onClick={onClose}
                >
                    ×
                </div>
            </div>
        </div>
    );
};

export default View3DImageModal;