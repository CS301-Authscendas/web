import { Modal } from 'antd';
import React, { createContext, useContext, useState } from 'react';

interface IModalContext {
  setIsOpen: (isOpen: boolean) => void;
  setModal: (payload: IModalPayload) => void;
}

interface IProps {
  children?: React.ReactNode;
}

const initialContext: IModalContext = {
  setModal: () => {},
  setIsOpen: () => {}
};

interface IModalPayload {
  title?: string | React.ReactNode;
  body?: React.ReactNode;
  callback?: () => {};
}

const ModalContext = createContext<IModalContext>(initialContext);

export const ModalProvider: React.FC<IProps> = ({ children }: IProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [title, setTitle] = useState<string | React.ReactNode>(null);
  const [body, setBody] = useState<string | React.ReactNode>(null);
  const [callback, setCallback] = useState<(() => {}) | undefined>(undefined);

  const setModal = (payload: IModalPayload) => {
    payload.title && setTitle(payload.title);
    payload.body && setBody(payload.body);
    payload.callback && setCallback(payload.callback);
  };

  const closeModal = () => {
    setIsOpen(false);
    setBody(null);
    setTitle(null);
    setCallback(undefined);
  };

  const handleOnSubmit = async () => {
    try {
      if (callback) {
        await callback();
        setIsOpen(false);
      }
    } catch (error) {
      console.log('error in modal submit');
    } finally {
      closeModal();
    }
  };

  const handleOnCancel = () => {
    setBody(null);
    setIsOpen(false);
  };

  return (
    <ModalContext.Provider
      value={{
        setIsOpen,
        setModal
      }}
    >
      <Modal
        title={title}
        open={isOpen}
        onOk={handleOnSubmit}
        onCancel={handleOnCancel}
        okButtonProps={{ ghost: true }}
      >
        {body}
      </Modal>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
