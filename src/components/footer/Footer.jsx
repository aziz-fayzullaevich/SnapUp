import { Link } from 'react-router-dom';
import FooterStyle from './Footer.module.css';

const Footer = () => {
    return (
        <footer className={FooterStyle.footerBlock}>
            <div className="container">
                <div className={FooterStyle.innerFooterBlock}>
                    <div>
                        <Link to='/' >privacy policy</Link>
                        <Link to='/' >term of service</Link>
                        <Link to='/' >About SnapUp.</Link>
                    </div>
                    <span>&copy; 2024 SnapUp. All Rights Reserved.</span>
                </div>
            </div>
        </footer>
    );
}

export default Footer;