import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './AboutUs.css';

const AboutUs = props => {
    return (
        <main className='aboutUs'>
            <div className='aboutUsTitle'>
                <img src={props.mockImg} alt="first image" />
                <div className='centered'><b>About Us</b></div>
            </div>
            <div className='aboutContent'>
                <div className='aboutPair'>
                    <div className='aboutImages'>
                        <img src={props.mockImg}></img>
                    </div>
                    <div className='aboutText'>
                        <p><b>Our Mission</b></p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                            Nulla aliquet nunc bibendum ante mollis iaculis. 
                            Cras bibendum laoreet elit, rutrum lacinia purus lacinia lacinia. 
                            Sed semper mi purus, non fringilla justo semper ac.
                        </p>
                    </div> 
                </div>
                <div className='aboutPair'>
                    <div className='aboutImages'>
                        <img src={props.mockImg}></img>
                    </div>
                    <div className='aboutText'>
                        <p><b>Our Values</b></p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                            Nulla aliquet nunc bibendum ante mollis iaculis. 
                            Cras bibendum laoreet elit, rutrum lacinia purus lacinia lacinia. 
                            Sed semper mi purus, non fringilla justo semper ac.
                        </p>
                    </div> 
                </div>
                <div className='aboutPair'>
                    <div className='aboutImages'>
                        <img src={props.mockImg}></img>
                    </div>
                    <div className='aboutText'>
                        <p><b>Our Goal</b></p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                            Nulla aliquet nunc bibendum ante mollis iaculis. 
                            Cras bibendum laoreet elit, rutrum lacinia purus lacinia lacinia. 
                            Sed semper mi purus, non fringilla justo semper ac.
                        </p>
                    </div> 
                </div>
            </div>
            <div className='aboutFooter'>
                <Link to='/terms'>Terms & Conditions</Link><br></br>
                <Link to='/faq'>FAQ</Link>
            </div>
        </main>
    )
};

export default AboutUs;