import { useState, useEffect } from "react";
import axiosInstance from "../../axios.js";
import { useNavigate, useLocation } from "react-router-dom";

const ContactForm = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');

    const route = location.pathname.split('/')[1];
    let contact_id = null;
    if (route === 'update-contact') {
        contact_id = location.pathname.split('/')[2];
    }

    const getContact = () => {
        axiosInstance().get(`/get-contact/${contact_id}`).then((res) => {
            const { name, number } = res.data.contact;
            setName(name);
            setNumber(number);
        })
    }

    useEffect(() => {
        if (route === "update-contact") {
            getContact();
        }
    }, []);

    const addContact = (e) => {
        e.preventDefault();

        const reqBody = {
            name,
            number,
        }

        if (route === 'update-contact') {
            axiosInstance().patch('/update-contact/' + contact_id, reqBody).then(() => {
                navigate('/');
            })
            setName("");
            setNumber("");
            navigate("/");
        }
        else {
            axiosInstance().post('/add-contact', reqBody).then(() => {
                setName("");
                setNumber("");
                navigate("/");
            })
        }
    }

    return (
        <form onSubmit={addContact}>
            <div>
                <label htmlFor="name">Name</label>
                <input type="text" name="name" id="name" onChange={(e) => setName(e.target.value)} value={name} />
            </div>
            <div>
                <label htmlFor="number">Number</label>
                <input type="text" name="number" id="number" onChange={(e) => setNumber(e.target.value)} value={number} />
            </div>

            <button type="submit">
                {route === "update-contact" ? "Update" : "Add"}
            </button>
        </form>
    )
}

export default ContactForm;