import React from 'react';
import styled from 'styled-components';

const ClearAllModal = ({ onConfirm, onCancel }) => {
    return (
        <Overlay>
            <Modal>
                <h3>⚠️ Confirm Clear All</h3>
                <p>Are you sure you want to delete all transactions?</p>
                <ButtonGroup>
                    <button className="cancel" onClick={onCancel}>Cancel</button>
                    <button className="confirm" onClick={onConfirm}>Yes, Clear All</button>
                </ButtonGroup>
            </Modal>
        </Overlay>
    );
};

export default ClearAllModal;

const Overlay = styled.div`
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
`;

const Modal = styled.div`
    background: #fff;
    padding: 30px;
    border-radius: 12px;
    max-width: 400px;
    width: 90%;
    box-shadow: 0 0 10px rgba(0,0,0,0.3);
    text-align: center;
`;

const ButtonGroup = styled.div`
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    gap: 20px;

    button {
        flex: 1;
        padding: 10px;
        border-radius: 6px;
        border: none;
        font-weight: bold;
        cursor: pointer;
    }

    .cancel {
        background: #ccc;
        color: #000;
    }

    .confirm {
        background: #F44336;
        color: #fff;
    }
`;
