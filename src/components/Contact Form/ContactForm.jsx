import { useState, useEffect, useContext } from "react";
import axiosInstance from "../../axios.js";
import { useNavigate, useLocation } from "react-router-dom";
import "./ContactForm.css";
import { Toaster, toast } from "react-hot-toast";

const ContactForm = ({ currPage, setCurrentPage }) => {
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
                toast.success("Contact Updated Successfully", {
                    duration: 2000,
                    position: 'top-center',
                })

                setTimeout(() => {
                    setName("");
                    setNumber("");
                    setCurrentPage("home")
                    navigate("/");
                }, 1000)
            })
        }
        else {
            axiosInstance().post('/add-contact', reqBody).then(() => {
                toast.success("Contact Added Successfully", {
                    duration: 2000,
                    position: 'top-center',
                })

                setTimeout(() => {
                    setName("");
                    setNumber("");
                    setCurrentPage("home")
                    navigate("/");
                }, 1000)
            })
        }
    }

    return (
        <>
            <form onSubmit={addContact} className="add-contact-form">
                {route === "update-contact" ? (<h1>UPDATE CONTACT</h1>) : (<h1>ADD CONTACT</h1>)}
                <div>
                    <label htmlFor="name">Name :</label>
                    <input type="text" name="name" id="name" placeholder="Enter Name" onChange={(e) => setName(e.target.value)} value={name} />
                </div>
                <div>
                    <label htmlFor="number">Number :</label>
                    <input type="text" name="number" id="number" placeholder="Enter Contact Number" onChange={(e) => setNumber(e.target.value)} value={number} />
                </div>

                <button type="submit">
                    {route === "update-contact" ? "Update" : "Add"}
                </button>
            </form>
            <Toaster />
        </>
    )
}

export default ContactForm;