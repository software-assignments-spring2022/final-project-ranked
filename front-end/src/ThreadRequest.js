import 'bootstrap/dist/css/bootstrap.min.css';
import './ThreadRequest.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const ThreadRequest = props => {
    return (
        <main className='ThreadRequest'>
            <div className='ThreadRequest-div'>
                <p><b>Requesting a New Game Thread</b></p>
                <Form>
                    <div className='ThreadRequest-questionDiv'>
                        <p className='ThreadRequest-questonP'>1. Do you want to be the moderator of this game thread?</p>
                        <div className='ThreadRequest-questonBtns'>
                            <Form.Check
                                label='Yes'
                                name='question1'
                                type={'radio'}
                            />
                            <Form.Check
                                label='No'
                                name='question1'
                                type={'radio'}
                            />
                        </div>
                    </div>
                    <div className='ThreadRequest-questionDiv'>
                        <p className='ThreadRequest-questonP'>
                            2. Do you have other friends who also want to moderate this thread?
                        </p>
                        <div className='ThreadRequest-questonBtns'>
                            <Form.Check
                                label='Yes'
                                name='question2'
                                type={'radio'}
                            />
                            <Form.Check
                                label='No'
                                name='question2'
                                type={'radio'}
                            />
                        </div>
                    </div>
                    <div className='ThreadRequest-textArea'>
                        <Form.Group>
                            <Form.Label>Reason for the request:</Form.Label>
                            <Form.Control as='textarea' rows={9} />
                        </Form.Group>
                        <Button variant="primary" type="submit" onClick={props.handleRequestClick}>Submit</Button>
                    </div>
                </Form>
            </div>
          </div>
          <div className="ThreadRequest-questionDiv">
            <p className="ThreadRequest-questonP">
              2. Do you have other friends who also want to moderate this
              thread?
            </p>
            <div className="ThreadRequest-questonBtns">
              <Form.Check label="Yes" name="question2" type={"radio"} />
              <Form.Check label="No" name="question2" type={"radio"} />
            </div>
          </div>
          <div className="ThreadRequest-textArea">
            <Form.Group>
              <Form.Label>Reason for the request:</Form.Label>
              <Form.Control as="textarea" rows={9} />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              onClick={props.handleRequestClick}
            >
              Submit
            </Button>
          </div>
        </Form>
      </div>
    </main>
  );
};

export default ThreadRequest