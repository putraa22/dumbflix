import React from 'react'
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import {AttachFile} from '@mui/icons-material'

export default function AddEpisode({showAdd, handleCloseAdd}) {
  return (
    <div>
        <Modal show={showAdd} onHide={handleCloseAdd} centered>
            <Modal.Header style={{backgroundColor: 'black'}}>
                <Modal.Title style={{color: 'white'}}>Add Episode</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{backgroundColor: 'black'}}>
            <Row>
        <Col xs={8}>
          <Form.Control placeholder="Title Episode" style={{backgroundColor: 'gray', color: 'white'}}/>
        </Col>
        <Col>
        <Form.Group style={{marginLeft: '-20px'}} controlId="formFile" className="mb-3">
            <Form.Label style={{backgroundColor: 'gray', padding: '5px', borderRadius: '5px', color: 'white'}} htmlFor='label'>Attach Thumbnail<AttachFile/></Form.Label>
            <Form.Control style={{display: 'none'}}  id='label' type="file" />
          </Form.Group>
        </Col>
      </Row>
      <Form.Control placeholder="Link Film" style={{backgroundColor: 'gray', color: 'white'}}/>
            </Modal.Body>
            <Modal.Footer style={{backgroundColor: 'black'}}>
                <Button style={{width: '200px'}} variant="danger" onClick={handleCloseAdd}>
                Add
                </Button>
            </Modal.Footer>
        </Modal>
    </div>
  )
}
