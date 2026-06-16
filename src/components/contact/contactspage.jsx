import React, { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Contact form submitted:", formData);
    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Get in Touch</h2>
        <p className="mt-4 text-lg text-gray-500">
          Have questions about our products or an order? We'd love to hear from you.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        {/* Contact Information Cards */}
        <div className="space-y-4 md:col-span-1">
          <div className="p-6 bg-white rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
              <Phone className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 text-sm">Call Us</h3>
              <p className="text-sm text-gray-500 mt-0.5">+1 (555) 019-2834</p>
            </div>
          </div>

          <div className="p-6 bg-white rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
              <Mail className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 text-sm">Email Support</h3>
              <p className="text-sm text-gray-500 mt-0.5">support@bloomshop.com</p>
            </div>
          </div>

          <div className="p-6 bg-white rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
              <MapPin className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 text-sm">Visit Store</h3>
              <p className="text-sm text-gray-500 mt-0.5">123 Store St, City, Country</p>
            </div>
          </div>
        </div>

        {/* Contact Form Block */}
        <div className="md:col-span-2 bg-white p-8 rounded-xl border border-gray-100 shadow-sm">
          {submitted ? (
            <div className="text-center py-8">
              <div className="inline-flex p-3 bg-green-50 text-green-600 rounded-full mb-4">
                <Send className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Message Sent!</h3>
              <p className="text-sm text-gray-500 mt-1">Thank you for reaching out. We will get back to you shortly.</p>
              <button 
                onClick={() => setSubmitted(false)}
                className="mt-6 text-sm text-blue-600 font-medium hover:underline"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-sm transition-all"
                  placeholder="Your name"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-sm transition-all"
                  placeholder="you@example.com"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                <textarea
                  name="message"
                  id="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-sm transition-all resize-none"
                  placeholder="How can we help you?"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full flex justify-center items-center gap-2 bg-blue-600 text-white py-2.5 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm text-sm"
              >
                <Send className="h-4 w-4" /> Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}