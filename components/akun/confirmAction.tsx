"use client";
import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/divider";
import {
  Modal,
  ModalFooter,
  ModalHeader,
  ModalContent,
} from "@nextui-org/modal";
import React, { MouseEvent } from "react";
interface Props {
  message: string;
  title: string;
  isOpen: boolean;
  onOpen: () => void;
  onOpenChange: () => void;
  onClickYa: (e: MouseEvent<HTMLButtonElement>) => void;
}
const ConfirmAction = (props: Props) => {
  return (
    <Modal
      className="w-[800px]"
      isOpen={props.isOpen}
      onOpenChange={props.onOpenChange}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="">
              <h1 className="font-semibold">{props.title}</h1>
            </ModalHeader>
            <Divider />
            <ModalHeader>
              <div className="flex-col min-h-[100px]">
                <label>{props.message}</label>
              </div>
            </ModalHeader>
            <Divider />
            <ModalFooter>
              <div className="w-full flex justify-end gap-2 items-end">
                <Button className="" onClick={onClose}>
                  TIDAK
                </Button>
                <Button
                  className="bg-primary-500 text-foreground-50"
                  onClick={props.onClickYa}
                >
                  YA
                </Button>
              </div>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ConfirmAction;
