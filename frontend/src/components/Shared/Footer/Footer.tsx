import { FaGithub } from 'react-icons/fa';
import { FaLinkedin } from 'react-icons/fa';

//Footer

const Footer = () => {
    return (
        <footer className="footer footer-center p-10 bg-gray-800 text-white w-full">
            <div className="grid grid-flow-col gap-4">

                <a href='https://github.com/ajkn1904' target="_blank" rel="noreferrer"><FaGithub className='text-[#68eac9] h-5 w-5' /></a>

                <a href='https://www.linkedin.com/in/anika-jumana-khanam/' target="_blank" rel="noreferrer"><FaLinkedin className='text-[#68eac9] h-5 w-5' /></a>



            </div>

            <div>
                <small>© Copyright 2022 || <span className='text-[#68eac9]'> Anika Jumana Khanam Nishat </span></small>
            </div>

        </footer>
    );
};

export default Footer;
