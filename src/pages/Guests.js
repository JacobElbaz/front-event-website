import React, { useEffect, useState } from 'react'
import { Table, Modal, Button, Form, ButtonGroup } from 'react-bootstrap'
import { useAppContext } from '../context';
import * as xlsx from 'xlsx'
import editpic from '../images/editer.png'
import supprimer from '../images/supprimer.png'
import example from '../images/example.png'

export default function Guests() {
    const { guests, editGuest, deleteGuest, addGuest } = useAppContext();
    const [input, setInput] = useState("");
    const [list, setList] = useState([]);
    const [showLogin, setShowLogin] = useState(!localStorage.getItem('connect'));
    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [showAdd, setShowAdd] = useState(false);
    const [showImport, setShowImport] = useState(false);
    const [imported, setImported] = useState(null);
    const [updatedGuest, setUpdatedGuest] = useState(null);
    const [password, setPassword] = useState(null);
    const [errorFormat, setErrorFormat] = useState(null);
    const [file, setFile] = useState(false);
    let _total = 0;
    const [total, setTotal] = useState(_total);
    const handleBack = () => {
        window.location = "/";
    }
    const handlePassword = e => {
        setPassword(e.target.value);
    }
    const handleSubmit = e => {
        e.preventDefault();
        if (password === "12345") {
            setShowLogin(false);
            localStorage.setItem('connect', true);
        }
        else {
            alert("Votre mot de passe est incorrect.")
        }
    }
    const onChangeHandler = e => {
        setInput(e.target.value);
    }

    const edit = guest => {
        editGuest(guest);
        setShowEdit(false);
    }

    const delete_guest = guest => {
        setShowEdit(false);
        deleteGuest(guest);
        setShowDelete(false);
    }

    const addNewGuest = guest => {
        addGuest(guest);
        setShowAdd(false);
    }

    const handleOnExport = () => {
        const wb = xlsx.utils.book_new();
        const filtered = guests.map(({name, phone, numberOfGuests}) => ({name, phone, numberOfGuests}));
        const ws = xlsx.utils.json_to_sheet(filtered);
        xlsx.utils.book_append_sheet(wb, ws, "Guests");
        xlsx.writeFile(wb, "MyGuestList.xlsx");
    }

    const readUploadFile = (e) => {
        e.preventDefault();
        if (e.target.files) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const data = e.target.result;
                const workbook = xlsx.read(data, { type: "array" });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const json = xlsx.utils.sheet_to_json(worksheet).filter(guest => !guests.some(g => g.phone == guest.phone) && guest.phone && guest.name);
                const toImport = json.map(guest => guest = { name: guest.name.toString(), phone: guest.phone.toString(), numberOfGuests: '0' })
                setImported(toImport);
                console.log(toImport);
                if (toImport.length == 0) {
                    setErrorFormat('Please check file format.')
                } else {setErrorFormat(null)}
            };
            reader.readAsArrayBuffer(e.target.files[0]);
            setFile(true);
        }
    }

    const importList = (imported) => {
        const newGuests = [...imported]
        newGuests.forEach(guest => addGuest(guest))
        setShowImport(false)
    }

    useEffect(() => {
        setList(guests.filter(guest => guest.name.toLowerCase().includes(input.toLowerCase()) || guest.phone.includes(input)));
        setTotal(guests.reduce((prev, curr) => prev + parseInt(curr.numberOfGuests), 0));
    }, [input, guests])

    return (
        <div>
            <h1>My Guests List</h1>
            <div className='text-center'><small className='text-muted'>Confirmations: <strong>{total}</strong></small></div>
            <hr />
            <div id='searchBar'>
                <div className='buttongroup m-1'>
                    <ButtonGroup>
                        <button className='btn btn-primary btn-sm' onClick={() => { setUpdatedGuest(null); setShowAdd(true) }}>+Add</button>
                        <button className='btn btn-outline-success btn-sm' onClick={handleOnExport}>Download</button>
                        <button className='btn btn-outline-secondary btn-sm' onClick={() => {setShowImport(true)}}>Import</button>
                    </ButtonGroup>
                </div>
                <div className='m-1'>
                    <input type="search" className='form-control mb-2' onChange={onChangeHandler} placeholder='Search' />
                </div>
            </div>
            <div className='m-1 text-sm'>
            <Table striped hover bordered>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Comming</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {input ? (
                        list.map(guest => {
                            _total += parseInt(guest.numberOfGuests);
                            return (
                                <tr key={guest._id}>
                                    <td>{guest.name}</td>
                                    <td>{guest.phone}</td>
                                    <td>{guest.numberOfGuests}</td>
                                    <td><button className='btn btn-outline btn-sm' onClick={() => { setUpdatedGuest(guest); setShowEdit(true) }}><img src={editpic} alt='' style={{ width: "20px", opacity: '0.6' }} /></button></td>
                                </tr>
                            )
                        })) :
                        (
                            guests.map(guest => {
                                _total += parseInt(guest.numberOfGuests);
                                return (
                                    <tr key={guest._id}>
                                        <td>{guest.name}</td>
                                        <td>{guest.phone}</td>
                                        <td>{guest.numberOfGuests}</td>
                                        <td><button className='btn btn-outline btn-sm' onClick={() => { setUpdatedGuest(guest); setShowEdit(true) }}><img src={editpic} alt='' style={{ width: "20px", opacity: '0.6' }} /></button></td>
                                    </tr>
                                )
                            })
                        )
                    }
                    <tr key={1}>
                        <td>TOTAL</td>
                        <td></td>
                        <td>{_total}</td>
                        <td></td>
                    </tr>
                </tbody>
            </Table>
            </div>
            <Modal show={showLogin} onHide={handleBack} dialogClassName='dialog'>
                <Modal.Header closeButton>
                    <Modal.Title>Please authenticate:</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label>This space is reserved for authorized persons. Please enter the password or return to the home page:</Form.Label>
                            <Form.Control type='text' placeholder='Mot de passe' onChange={handlePassword} autoFocus />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleBack}>
                        Back
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Login
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showEdit} onHide={() => { setShowEdit(false) }}>
                <Modal.Header closeButton>
                    Edit Contact
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type='text' value={updatedGuest?.name} onChange={(e) => { setUpdatedGuest({ ...updatedGuest, name: e.target.value }) }}></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Phone</Form.Label>
                            <Form.Control type='text' value={updatedGuest?.phone} onChange={(e) => { setUpdatedGuest({ ...updatedGuest, phone: e.target.value }) }}></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Number of people</Form.Label>
                            <Form.Control type='number' value={updatedGuest?.numberOfGuests} onChange={(e) => { setUpdatedGuest({ ...updatedGuest, numberOfGuests: e.target.value }) }}></Form.Control>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <button className='btn btn-danger btn-edit' onClick={() => { setShowDelete(true) }}><img src={supprimer} alt='' style={{ width: "20px", filter: "invert(1)", opacity: "0.9" }} /></button>
                    <Button variant="secondary" onClick={() => { setShowEdit(false) }}>Back</Button>
                    <Button variant="primary" onClick={() => { edit(updatedGuest) }}>Edit</Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showDelete} onHide={() => { setShowDelete(false) }}>
                <Modal.Header closeButton>
                    Delete Contact
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete this guest's reply?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => { setShowDelete(false) }}>Back</Button>
                    <Button variant="danger" onClick={() => { delete_guest(updatedGuest) }}>Yes, permanently delete.</Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showAdd} onHide={() => { setShowAdd(false) }}>
                <Modal.Header closeButton>
                    Add Contact
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type='text' placeholder='Name' onChange={(e) => { setUpdatedGuest({ ...updatedGuest, name: e.target.value }) }} required></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Phone</Form.Label>
                            <Form.Control type='text' placeholder='050-000-0000' onChange={(e) => { setUpdatedGuest({ ...updatedGuest, phone: e.target.value }) }} required></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Number of people</Form.Label>
                            <Form.Control type='text' placeholder='0' onChange={(e) => { setUpdatedGuest({ ...updatedGuest, numberOfGuests: e.target.value }) }} required></Form.Control>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => { setShowAdd(false) }}>Cancel</Button>
                    <Button variant="primary" onClick={() => { addNewGuest(updatedGuest) }} disabled={!(updatedGuest?.name && updatedGuest?.phone && updatedGuest?.numberOfGuests)}>Add</Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showImport} onHide={() => { setShowImport(false) }}>
                <Modal.Header closeButton>
                    Import List
                </Modal.Header>
                <Modal.Body>
                    <p>Make sure that the headers names of the file are 'name' and 'phone' like that:</p>
                    <img className='w-100' src={example} alt="example" />
                    <label>Choose a file (xlsx, xls, csv)</label>
                    <input className={`form-control ${errorFormat && "error-input"}`} id='file' type="file" accept='.xls, .xlsx, .csv' name='upload' onChange={readUploadFile}/>
                    <p className='text-danger'>{errorFormat}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => { setShowImport(false) }}>Back</Button>
                    <Button variant="primary" onClick={() => { importList(imported) }} disabled={errorFormat || !file}>Import</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
