import { useState, useEffect } from 'react';
import axiosInstance from '../../axios';
import { useNavigate } from 'react-router-dom';
import './Contacts.css';
import Loader from '../../components/Loader/Loader';

const Contacts = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [contacts, setContacts] = useState([]);

    const fetchContacts = () => {
        axiosInstance().get('/get-contacts').then((response) => {
            setContacts(response.data.contacts);
            setIsLoading(false);
        })
    }

    useEffect(() => {
        fetchContacts();
    }, []);

    if (isLoading) {
        return (
            <>
                <Loader />
            </>
        )
    }

    return (
        <>
            <div className='contacts-container'>
                <h1>All Contacts</h1>
                {
                    contacts.length != 0
                        ?
                        <>
                            <table className='fixed_header'>
                                <thead>
                                    <tr style={{ background: 'var(--ter-color)' }}>
                                        <th className='nameCol'>Name</th>
                                        <th className='numCol'>Number</th>
                                        <th colSpan={2} className='actionCol'>Actions</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {
                                        contacts.map((contact, i) => {
                                            return (
                                                <tr key={i}>
                                                    <td className='nameCell'>{contact.name}</td>
                                                    <td className='numCell'>{contact.number}</td>
                                                    <td className='actionCell'> <button onClick={() => {
                                                        navigate("/update-contact/" + contact._id)
                                                    }}>Edit</button> </td>
                                                    <td> <button onClick={() => {
                                                        axiosInstance().delete('/delete-contact/' + contact._id).then(() => {
                                                            toast.success("Contact deleted successfully", {
                                                                duration: 2000,
                                                                position: 'top-center'
                                                            })
                                                            fetchContacts();
                                                        })
                                                            .catch((err) => {
                                                                toast.error(err.response.data.message);
                                                            })
                                                    }}>Delete</button> </td>
                                                </tr>
                                            );
                                        })
                                    }
                                </tbody>
                            </table>
                        </>
                        :
                        <p className='n'>No Contacts</p>
                }
            </div>
        </>
    )
}

export default Contacts;