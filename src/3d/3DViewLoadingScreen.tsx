// src/components/View3DLoading.tsx
import React from 'react';

interface View3DLoadingProps {
    loadingProgress: number;
}

const View3DLoading: React.FC<View3DLoadingProps> = ({ loadingProgress }) => {
    return (
        <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'rgba(0, 0, 0, 0.7)',
            color: 'white',
            fontSize: '24px',
            zIndex: 1000,
        }}>
            <div>Loading 3D Model...</div>
            <div style={{ marginTop: '20px', fontSize: '18px' }}>
                {loadingProgress}%
            </div>
            <div style={{
                width: '200px',
                height: '20px',
                background: '#333',
                marginTop: '10px',
                borderRadius: '10px',
                overflow: 'hidden',
            }}>
                <div style={{
                    width: `${loadingProgress}%`,
                    height: '100%',
                    background: '#4CAF50',
                    transition: 'width 0.3s ease-in-out',
                }} />
            </div>
        </div>
    );
};

export default View3DLoading;