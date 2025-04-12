import { useState } from 'react';
import toast from 'react-hot-toast';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    toast.success('Message sent successfully!');

    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 flex flex-col items-center">
      <div className="bg-white w-full max-w-5xl rounded-xl shadow-lg overflow-hidden flex flex-col lg:flex-row">
        {/* Contact Info */}
        <div className="bg-indigo-600 text-white w-full lg:w-1/2 p-8 space-y-6">
          <h2 className="text-3xl font-bold">Get in Touch</h2>
          <p className="text-indigo-100">
            We’d love to hear from you. Reach out to us using the info below or send a message directly.
          </p>

          <div>
            <h4 className="font-semibold">📞 Phone</h4>
            <p className="text-indigo-100">+94 77 9619005</p>
          </div>

          <div>
            <h4 className="font-semibold">📍 Address</h4>
            <p className="text-indigo-100">No: 297/8, Walauwathta Madupitiya, Panadura, Sri Lanka</p>
          </div>

          <div>
            <h4 className="font-semibold">🕒 Opening Hours</h4>
            <p className="text-indigo-100">Monday - Friday: 9:00 AM - 6:00 PM</p>
            <p className="text-indigo-100">Saturday: 10:00 AM - 2:00 PM</p>
            <p className="text-indigo-100">Sunday: Closed</p>
          </div>

          <div>
            <h4 className="font-semibold">📧 Email</h4>
            <p className="text-indigo-100">upulkgangodawila1981.com</p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="w-full lg:w-1/2 p-6 sm:p-10">
          <h3 className="text-2xl font-bold mb-6 text-gray-800 text-center">Send a Message</h3>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block mb-1 font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">Message</label>
              <textarea
                name="message"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your message..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>

      {/* Google Map */}
      <div className="w-full max-w-5xl h-64 sm:h-80 md:h-96 mt-10 rounded-xl overflow-hidden shadow-lg">
        <iframe
          title="Google Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63309.92729860537!2d79.8803445!3d6.7155176!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae243e536edfbad%3A0x62042f4475ddf9a7!2sCargills%20Square%20Panadura!5e0!3m2!1sen!2slk!4v1712563885596!5m2!1sen!2slk"
          width="100%"
          height="100%"
          className="border-0"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
}
