import { RiFacebookFill, RiTwitterFill, RiInstagramFill, RiGithubFill, RiMailFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';

const menuItems = [
  { text: "About Us", link: "/about" },
  { text: "Our Services", link: "/services" },
  { text: "Privacy Policy", link: "/privacy" },
  { text: "Terms of Service", link: "/terms" },
];

const Footer = () => {
  const new_date = new Date();
  const date = new_date.getFullYear();

  return (
    <footer className="bg-neutral-100">
      <div className="max-w-[72rem] mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h2 className="text-lg font-semibold mb-4">About Us</h2>
            <p className="text-sm text-neutral-600 mb-4">
              We are dedicated to providing high-quality products and services to our customers. 
              Our mission is to innovate and inspire in everything we do.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-neutral-600 hover:text-neutral-900">
                <RiFacebookFill className="text-[1.5rem] " />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-neutral-600 hover:text-neutral-900">
                <RiTwitterFill className="text-[1.5rem] " />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-neutral-600 hover:text-neutral-900">
                <RiInstagramFill className="text-[1.5rem] " />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-neutral-600 hover:text-neutral-900">
                <RiGithubFill className="text-[1.5rem] " />
                <span className="sr-only">GitHub</span>
              </a>
            </div>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
            <nav>
              <ul className="space-y-2">
                {menuItems.map((item, index) => (
                  <li key={index}>
                    <Link to={item.link} className="text-sm text-neutral-600 hover:text-neutral-900">
                      {item.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-4">Stay Updated</h2>
            <p className="text-sm text-neutral-600 mb-4">
              Subscribe to our newsletter for the latest updates and offers.
            </p>
            <form className="flex flex-col space-y-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-3 py-2 bg-white border border-neutral-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
              <button
                type="submit"
                className="px-4 py-2 bg-primary-600 text-white rounded-md text-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        <div className="border-t border-neutral-200 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-neutral-600 mb-4 md:mb-0">
              © {date} Your Company. All rights reserved.
            </p>
            <div className="flex items-center space-x-2">
              <RiMailFill className="h-5 w-5 text-neutral-600" />
              <span className="text-sm text-neutral-600">afriseed@seed.com</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer;