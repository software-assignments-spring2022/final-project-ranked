import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './AboutUs.css';
import termsCondtions from './TermsConditions';

const AboutUs = props => {
    return (
        <main className='aboutUs'>
             <div className='aboutUsTitle'>Standard Header</div>
            <div className='aboutUsTitle'><img src={props.mockImg}></img>
            <div className='centered'><b>First Image</b></div>
            </div>

            <div className='aboutContent'>
                <div className='aboutPair'>
                    <div className='aboutImages'>
                        <img src={props.mockImg}></img>
                    </div>
                    <div className='aboutText'>
                        <p>============================================================================</p>
                    </div> 
                </div>
                <div className='aboutPair'>
                    <div className='aboutImages'>
                        <img src={props.mockImg}></img>
                    </div>
                    <div className='aboutText'>
                        <p>============================================================================</p>
                    </div> 
                </div>
                <div className='aboutPair'>
                    <div className='aboutImages'>
                        <img src={props.mockImg}></img>
                    </div>
                    <div className='aboutText'>
                        <p>============================================================================</p>
                    </div> 
                </div>
            </div>
            <div className='aboutFooter'><Link to='/terms'>Terms & Conditions </Link><br></br>
            <Link to='/faq'>FAQ</Link>
            
            </div>

        </main>
        
    )
};

export default AboutUs;
