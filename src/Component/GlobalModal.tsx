import React, { Children } from "react";
import { Modal, Button } from "react-bootstrap";
interface GlobalModalProps {
  title: string;
  Children: any;
  showmodal: boolean;
  closemodal: () => void;
}

export default function GlobalModal({
  Children,
  showmodal,
  closemodal,
}: GlobalModalProps) {
  return (
    <div>
      <Modal show={showmodal} onHide={closemodal} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Add</Modal.Title>
        </Modal.Header>
        <Modal.Body>{Children}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closemodal}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              // handleDeleteUser(deleteuserid);
            }}
          >
            ok
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
