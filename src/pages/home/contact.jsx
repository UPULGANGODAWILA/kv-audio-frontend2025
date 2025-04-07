import { useState } from 'react';

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
    alert(`Message sent!\n\nName: ${formData.name}\nEmail: ${formData.email}`);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 flex items-center justify-center">
      <div className="bg-white w-full max-w-5xl rounded-xl shadow-lg overflow-hidden flex flex-col lg:flex-row">
        {/* Contact Info */}
        <div className="bg-indigo-600 text-white w-full lg:w-1/2 p-8 space-y-6">
          <h2 className="text-3xl font-bold">Get in Touch</h2>
          <p className="text-indigo-100">We’d love to hear from you. Reach out to us using the info below or send a message directly.</p>

          <div>
            <h4 className="font-semibold">📞 Phone</h4>
            <p className="text-indigo-100">+94 77 123 4567</p>
          </div>

          <div>
            <h4 className="font-semibold">📍 Address</h4>
            <p className="text-indigo-100">123, Main Street, Colombo, Sri Lanka</p>
          </div>

          <div>
            <h4 className="font-semibold">🕒 Opening Hours</h4>
            <p className="text-indigo-100">Monday - Friday: 9:00 AM - 6:00 PM</p>
            <p className="text-indigo-100">Saturday: 10:00 AM - 2:00 PM</p>
            <p className="text-indigo-100">Sunday: Closed</p>
          </div>

          <div>
            <h4 className="font-semibold">📧 Email</h4>
            <p className="text-indigo-100">contact@yourcompany.com</p>
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
    </div>
  );
}
