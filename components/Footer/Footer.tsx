'use client'

import { useState, FormEvent } from 'react'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubscribe = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    setTimeout(() => {
      setEmail('')
      setIsSubmitting(false)
    }, 1000)
  }

  return (
    <footer className="food-footer w-full bg-food-dark text-gray-300 py-16">
      <div className="food-footer-content max-w-[1518px] mx-auto px-[120px]">
        <div className="food-footer-top flex justify-between mb-16">
          <div className="food-footer-menu flex gap-16">
            <div className="food-footer-column">
              <h3 className="text-white font-bold text-base mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm hover:text-white transition-colors">About us</a></li>
                <li><a href="#" className="text-sm hover:text-white transition-colors">Team</a></li>
                <li><a href="#" className="text-sm hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="text-sm hover:text-white transition-colors">Blog</a></li>
              </ul>
            </div>

            <div className="food-footer-column">
              <h3 className="text-white font-bold text-base mb-4">Contact</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm hover:text-white transition-colors">Help & Support</a></li>
                <li><a href="#" className="text-sm hover:text-white transition-colors">Partner with us</a></li>
                <li><a href="#" className="text-sm hover:text-white transition-colors">Ride with us</a></li>
              </ul>
            </div>

            <div className="food-footer-column">
              <h3 className="text-white font-bold text-base mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm hover:text-white transition-colors">Terms & Conditions</a></li>
                <li><a href="#" className="text-sm hover:text-white transition-colors">Refund & Cancellation</a></li>
                <li><a href="#" className="text-sm hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-sm hover:text-white transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
          </div>

          <div className="food-footer-social flex flex-col gap-11">
            <div>
              <h3 className="text-white font-bold text-base mb-4">FOLLOW US</h3>
              <div className="food-social-icons flex gap-4">
                <a href="#" className="hover:opacity-80 transition-opacity" aria-label="Instagram">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="2" fill="none"/>
                    <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" fill="none"/>
                    <circle cx="17" cy="7" r="1" fill="currentColor"/>
                  </svg>
                </a>
                <a href="#" className="hover:opacity-80 transition-opacity" aria-label="Facebook">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" fill="currentColor"/>
                  </svg>
                </a>
                <a href="#" className="hover:opacity-80 transition-opacity" aria-label="Twitter">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" fill="currentColor"/>
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <p className="mb-4 text-sm">Receive exclusive offers in your mailbox</p>
              <form onSubmit={handleSubscribe} className="food-newsletter-form flex gap-2.5">
                <div className="food-email-input-wrapper relative flex-1">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                    <svg width="24" height="18" viewBox="0 0 24 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M23.5312 5.95312C22.4531 6.79688 21.0938 7.82812 16.3125 11.2969C15.375 12 13.6406 13.5469 12 13.5469C10.3125 13.5469 8.625 12 7.64062 11.2969C2.85938 7.82812 1.5 6.79688 0.421875 5.95312C0.234375 5.8125 0 5.95312 0 6.1875V15.75C0 17.0156 0.984375 18 2.25 18H21.75C22.9688 18 24 17.0156 24 15.75V6.1875C24 5.95312 23.7188 5.8125 23.5312 5.95312ZM12 12C13.0781 12.0469 14.625 10.6406 15.4219 10.0781C21.6562 5.57812 22.125 5.15625 23.5312 4.03125C23.8125 3.84375 24 3.51562 24 3.14062V2.25C24 1.03125 22.9688 0 21.75 0H2.25C0.984375 0 0 1.03125 0 2.25V3.14062C0 3.51562 0.140625 3.84375 0.421875 4.03125C1.82812 5.15625 2.29688 5.57812 8.53125 10.0781C9.32812 10.6406 10.875 12.0469 12 12Z" fill="#ADADAD"/>
                    </svg>
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter Your email"
                    className="food-email-input w-full h-[60px] pl-12 pr-4 py-2 rounded-lg bg-[#2A2A2A] border-none outline-none text-white placeholder-gray-400 text-sm"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="food-subscribe-btn h-[60px] px-6 py-[21px] rounded-lg bg-food-gradient-subscribe text-white font-bold text-sm leading-[100%] shadow-food-subscribe disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>

        <hr className="border-gray-600 mb-4" />

        <div className="food-footer-bottom flex justify-between items-center">
          <p className="text-sm">All rights Reserved © Your Company, 2021</p>
          <p className="text-sm">Made with ❤️ by Themewagon</p>
        </div>
      </div>
    </footer>
  )
}

