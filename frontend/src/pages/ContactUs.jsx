import React, { useState } from "react";
import emailjs from "emailjs-com";
import { UseAuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";
const ContactPage = () => {
    const { authUser } = UseAuthContext();
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState("");


    const handleSubmit = async (e) => {
        e.preventDefault();



        const emailData = {
            message,
            from_name: authUser.userEmail,
        };


        try {
            // Use async/await for EmailJS send
            const response = await emailjs.send(
                "service_krrvzqg", // Replace with your EmailJS service ID
                "template_5es8loi", // Replace with your EmailJS template ID
                emailData,
                "OH3oG559NN6ddE6ZV" // Replace with your EmailJS public key
            );

            if (response.status === 200) {
                setMessage(""); // Clear the message field
                toast.success("Email sent successfully!");
            }

        } catch (error) {
            toast.error("Failed to send email. Please try again.");
        }



    };

    return (
        <div className="contact-page">
            <h1>Contact Us</h1>
            <p>We'd love to hear from you! Feel free to reach out using the form below or contact us directly.</p>

            <form className="contact-form" onSubmit={handleSubmit}>
                <textarea
                    className="contact-textarea"
                    placeholder="Write your message here..."
                    rows="6"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                ></textarea>
                <button type="submit" className="send-button">
                    Send Email
                </button>
            </form>

            {status && <p>{status}</p>}

            <div className="contact-info">
                <h2>Contact Information</h2>
                <p>
                    📧 Email: <a href="mailto:contact@yourdomain.com">ecogreentech58@gmail.com</a>
                </p>
                <p>
                    📞 Phone: <a href="tel:+1234567890">+1 234 567 890</a>
                </p>
            </div>
        </div>
    );
};

export default ContactPage;