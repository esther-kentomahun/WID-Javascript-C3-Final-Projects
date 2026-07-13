import { FaFacebook, FaInstagram, FaLinkedin, FaPinterest, FaXTwitter } from "react-icons/fa6";

function Footer() {
  return (
    <footer className="bg-white mt-2">
      <div className="max-w-7xl mx-auto px-6 py-10">

      

        {/* Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mt- bg" >

          {/* Logo & Address */}
          <div>
            <h2 className="text-3xl font-bold text-teal-600">
              VoluntHub
            </h2>

            <p className="text-gray-500 mt-5 leading-7">
              VoluntHub Inc.
              <br />
              123 Charity Street
              <br />
              Lagos, Nigeria
              <br />
              support@volunthub.com
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-5">
              Quick Links
            </h3>

            <ul className="space-y-3 text-gray-600">
              <li><a href="#">Home</a></li>
              <li><a href="#">Volunteer</a></li>
              <li><a href="#">NGOs</a></li>
              <li><a href="#">About</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-lg mb-5">
              Company
            </h3>

            <ul className="space-y-3 text-gray-600">
              <li><a href="#">About Us</a></li>
              <li><a href="#">Our Team</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms</a></li>
            </ul>
          </div>

          {/* Opportunities */}
          <div>
            <h3 className="font-semibold text-lg mb-5">
              Opportunities
            </h3>

            <ul className="space-y-3 text-gray-600">
              <li><a href="#">Browse Jobs</a></li>
              <li><a href="#">Remote Roles</a></li>
              <li><a href="#">Internships</a></li>
              <li><a href="#">Volunteer Roles</a></li>
              <li><a href="#">Apply Now</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Footer */}
        <div className="border-t mt-14 pt-6 flex flex-col md:flex-row justify-between items-center">

          <div className="flex gap-5 text-xl">
            <FaFacebook className="cursor-pointer hover:text-teal-500" />
            <FaXTwitter className="cursor-pointer hover:text-teal-500" />
            <FaLinkedin className="cursor-pointer hover:text-teal-500" />
            <FaInstagram className="cursor-pointer hover:text-teal-500" />
            <FaPinterest className="cursor-pointer hover:text-teal-500" />
          </div>

          <p className="text-gray-500 mt-5 md:mt-0">
            © 2026 All Rights Reserved.
          </p>

        </div>

      </div>
    </footer>
  );
}

export default Footer;