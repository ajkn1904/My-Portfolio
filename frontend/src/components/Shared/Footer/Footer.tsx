import { GithubIcon, LinkedinIcon } from 'lucide-react';
import Link from 'next/link';

//Footer

const Footer = () => {
    return (
        <footer className="footer footer-center p-10 bg-gray-800 text-white pl-[90px] text-center w-full">
            <div className="flex justify-center gap-4">

                <Link href='https://github.com/ajkn1904' target="_blank" rel="noreferrer"><GithubIcon className='text-[#68eac9] h-5 w-5' /></Link>

                <Link href='https://www.linkedin.com/in/anika-jumana-khanam/' target="_blank" rel="noreferrer"><LinkedinIcon className='text-[#68eac9] h-5 w-5' /></Link>



            </div>

            <div>
                <small>© Copyright 2025 || <span className='text-[#68eac9]'> Anika Jumana Khanam Nishat </span></small>
            </div>

        </footer>
    );
};

export default Footer;
