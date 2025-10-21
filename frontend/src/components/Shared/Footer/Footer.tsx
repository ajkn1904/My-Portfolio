import { GithubIcon, LinkedinIcon, Mail, Phone } from 'lucide-react';
import Link from 'next/link';

//Footer

const Footer = () => {
    return (
        <footer className="footer footer-center p-10 bg-gray-800 text-white pl-[90px] text-center w-full">
            <div className="flex justify-center gap-4 pt-10 pb-5">

                <Link href='https://github.com/ajkn1904' target="_blank" rel="noreferrer"><GithubIcon className='text-secondary hover:text-primary h-5 w-5' /></Link>

                <Link href='https://www.linkedin.com/in/anika-jumana-khanam/' target="_blank" rel="noreferrer"><LinkedinIcon className='text-secondary hover:text-primary h-5 w-5' /></Link>

                <a href="mailto:anika.nishat06@gmail.com"><Mail className="text-secondary hover:text-primary h-5 w-5" /></a>

                <a href="tel:+8801521228030"><Phone className="text-secondary hover:text-primary h-5 w-5" /> </a>


            </div>

            <div>
                <small>© Copyright 2025 || <span className='text-secondary'> Anika Jumana Khanam Nishat </span></small>
            </div>

        </footer>
    );
};

export default Footer;
