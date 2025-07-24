// src/components/ConfirmModal.jsx
import styled from 'styled-components';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0; left: 0;
  width: 100vw; height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: grid;
  place-items: center;
  z-index: 999;
`;

const ModalBox = styled.div`
  background: #fff;
  padding: 2rem;
  border-radius: 12px;
  width: 300px;
  text-align: center;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 1.5rem;

  button {
    padding: 0.5rem 1rem;
    border-radius: 6px;
    border: none;
    cursor: pointer;
  }

  .cancel {
    background: #aaa;
    color: white;
  }

  .confirm {
    background: #f44336;
    color: white;
  }
`;

const ConfirmModal = ({ onConfirm, onCancel }) => {
    return (
        <ModalOverlay>
            <ModalBox>
                <p>Are you sure you want to delete this transaction?</p>
                <ButtonGroup>
                    <button className="cancel" onClick={onCancel}>Cancel</button>
                    <button className="confirm" onClick={onConfirm}>Delete</button>
                </ButtonGroup>
            </ModalBox>
        </ModalOverlay>
    );
};

export default ConfirmModal;
