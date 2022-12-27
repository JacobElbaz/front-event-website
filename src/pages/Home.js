import React, { useMemo, useRef, useState, useEffect } from 'react'
import { Form, Button, Col, Row, Modal } from 'react-bootstrap'
import Countdown from '../components/Countdown'
import './Home.css'
import { useAppContext } from '../context'
import carte from '../images/carte.png'
import waze from '../images/waze.png'
import addEvent from '../images/add-event.png'
import whatsapp from '../images/whatsapp.png'
import { atcb_action } from 'add-to-calendar-button';
import 'add-to-calendar-button/assets/css/atcb.css';

export default function Home() {
    const brideName = 'Lauren';
    const groomName = 'Michael';
    const { addGuest } = useAppContext();
    const [guest, setGuest] = useState({ name: null, phone: null, numberOfGuests: null });
    const [show, setShow] = useState(false);
    const nameRef = useRef();
    const phoneRef = useRef();
    const numRef = useRef();
    const handleClose = () => {
        setShow(false);
    }
    const handleOnChange = e => {
        var value = e.target.value;
        if (e.target.name == 'name') {
            const arr = value.split(" ");
            for (var i = 0; i < arr.length; i++) {
                arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
            }
            value = arr.join(" ");
        }
        setGuest({ ...guest, [e.target.name]: value })
    }
    const handleOnSubmit = e => {
        e.preventDefault();
        addGuest(guest);
        setGuest({ name: null, phone: null, numberOfGuests: null });
        nameRef.current.value = null;
        phoneRef.current.value = null;
        numRef.current.value = null;
        setShow(true);
    }
    const isValid = useMemo(() => {
        return Object.values(guest).some(value => !value);
    }, [guest])

    return (
        <>
            <div className='d1' id='header'>
                <h1>{brideName} et {groomName}</h1>
                <div className='m-5'>
                    <h5>Coming soon</h5>
                    <Countdown timeTillDate="11 01 2022, 11:30 am" timeFormat="MM DD YYYY, h:mm a" />
                </div>
            </div>
            <div className='d1 carte' id='wedding'>
                <h1>The Wedding</h1>
                <img src={carte} alt="carte" />
                <button className='carte-btn' onClick={() => {
                    atcb_action({
                        name: "Wedding Lauren and Michael",
                        startDate: "2022-10-14",
                        endDate: "2022-10-18",
                        options: ['Apple', 'Google', 'iCal', 'Microsoft365', 'Outlook.com', 'Yahoo'],
                        timeZone: "Europe/Berlin",
                        iCalFileName: "Reminder-Event",
                    });
                }}>
                    <img src={addEvent} alt=""/>
                    Add to calendar
                </button>
                <a className='carte-btn' href="https://ul.waze.com/ul?preview_venue_id=23003454.229837931.6121&navigate=yes&utm_campaign=default&utm_source=waze_website&utm_medium=lm_share_location" target={"_blank"}>
                    <img src={waze} alt="" />
                    Waze
                </a>
                <a className='carte-btn' href='https://wa.me/972503013489' target={"_blank"}>
                    <img src={whatsapp} alt="" />
                    Whatsapp
                    </a>
            </div>

            <div className='d1' id='answer'>
                <h1>Your Answer</h1>
                <div id='form'>
                    <Form onSubmit={handleOnSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicPhone">
                            <Form.Label>Name</Form.Label>
                            <Form.Control name='name' ref={nameRef} type="text" className='tel text-capitalize' placeholder="Lewis Hamilton" onChange={handleOnChange} required />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPhone">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control name='phone' ref={phoneRef} type="tel" className='tel' placeholder="050-000-0000" onChange={handleOnChange} required />
                        </Form.Group>
                        <Form.Group as={Row} className='mb-3' controlId="formBasicGuests">
                            <Form.Label column sm={2}>Number of people:</Form.Label>
                            <Col sm={1}>
                                <Form.Control name="numberOfGuests" ref={numRef} className='numOfGuests' type="number" placeholder='0' onChange={handleOnChange} required />
                            </Col>
                        </Form.Group>
                        <Button variant="secondary" type="submit" disabled={isValid}>
                            Send
                        </Button>
                    </Form>
                    <p id='info'>*Replies requested as soon as possible.</p>
                </div>
            </div>


            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Thank you for your reply!</Modal.Title>
                </Modal.Header>
                <Modal.Body>You can modify your answer by filling out this form again, entering the same phone number.</Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleClose}>
                        OK
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
