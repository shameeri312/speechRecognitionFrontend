'use client'

import { useState } from 'react'

const Contact = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = () => {
    if (!name || !email || !message) {
      alert('Please fill in all fields.')
      return
    }

    alert('Message sent successfully!')
  }

  return (
    <div className="mx-auto flex w-full justify-center gap-5 px-6 xl:container xl:px-0">
      {/* Form Section */}
      <div className="backdrop flex h-auto w-full max-w-lg flex-col rounded-2xl border-2 border-gray-600 bg-gradient-to-br from-neutral-600/20 to-gray-800/40 p-8 shadow-xl">
        <div className="flex h-full w-full flex-col justify-around gap-6">
          <h2 className="text-3xl font-bold md:text-4xl">Contact Us</h2>
          <p className="text-gray-300">We'd love to hear from you!</p>

          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-white">
              Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-12 rounded-xl border border-neutral-600 bg-gradient-to-br from-neutral-600/20 to-gray-400/20 px-5 text-white md:h-[56px]"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-white">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 rounded-xl border border-neutral-600 bg-gradient-to-br from-neutral-600/20 to-gray-400/20 px-5 text-white md:h-[56px]"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="message" className="text-white">
              Message
            </label>
            <textarea
              id="message"
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              className="rounded-xl border border-neutral-600 bg-gradient-to-br from-neutral-600/20 to-gray-400/20 px-5 py-3 text-white"
            />
          </div>

          <div className="custom gradient w-max rounded-l-xl rounded-br-xl p-1">
            <button
              onClick={handleSubmit}
              className="custom nova mx-auto h-12 w-[120px] cursor-pointer rounded-l-xl rounded-br-xl bg-black font-semibold text-white md:h-[56px] md:w-[150px]"
            >
              Send
            </button>
          </div>
        </div>
      </div>

      {/* Image Section */}

      <div className="hidden h-auto w-full max-w-lg flex-col gap-5 rounded-2xl border-2 border-gray-500 bg-gradient-to-br from-neutral-600/20 to-gray-800/40 p-8 text-white backdrop-blur lg:flex">
        <img
          src="/contact.jpg"
          alt="Contact Illustration"
          width={500}
          height={500}
          className="rounded-xl object-contain"
        />
        <p className="text-center text-sm text-gray-400">
          Let’s connect and talk emotions!
        </p>
      </div>
    </div>
  )
}

export default Contact
