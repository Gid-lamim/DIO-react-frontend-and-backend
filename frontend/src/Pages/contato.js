import { useState, useEffect } from 'react';
import { Grid, Button, TextField } from '@material-ui/core/';

const Contatos = () => {

    const url = 'http://localhost:5000/message'
    const [message, setMessage] = useState([]);
    const [author, setAuthor] = useState('');
    const [content, setContent] = useState('');
    const [validator, setValidator] = useState(false);
    const [render, setRender] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(async () => {
        const response = await fetch(url)
        const data = await response.json();
        setMessage(data);

    }, [render]) //[render] it will rerender the page everytime render changes 

    const sendMessage = () => {
        setValidator(false);
        if(author.length <= 0 || content.length <= 0){
            return setValidator(!validator)
        } else if (content.length <=6 ){
            return setValidator(!validator)
        }

    
        const bodyForm = {
            email: author,
            message: content,
        }

        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(bodyForm)
        })
        //then is used to treat the response after fetch
        //.then((response) => response.json())
        .then((data) => {
            if(data.json) {
                console.log(data.json? 'y': 'n');
                setRender(true);
                setSuccess(true);//this will trigger the message 
                setTimeout(() => {//this will hide the message after 5 seconds 
                    setSuccess(false);
                }, 5000)
            }
        })

        setRender(false); // we need to set render back to false, othere wise the page won't rerender 
        setAuthor('');
        setContent('');
        
        
    }  

    return(
        <>
            <Grid container direction="row" xs={12}>
                <TextField id="name" label="Name" value={author} onChange={(event)=>{setAuthor(event.target.value)}} fullWidth/>
                <TextField id="message" label="Message" value={content} onChange={(event)=>{setContent(event.target.value)}} fullWidth/>
            </Grid>

            {validator && // if validator is true, it will display the message 
                <div className="alert alert-warning alert-dismissible fade show mt-2" role="alert">
                    <strong>Por favor preencha todos os campos corretamente!</strong>
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            }

            {success && 
                <div className="alert alert-success alert-dismissible fade show mt-2" role="alert">
                    <strong>Mensagem foi enviada</strong>
                </div>
            }

            <Button onClick={sendMessage} className="mt-2" variant="contained" color="primary">
                Send message
            </Button>

            {message.map((content) => {
               
                return(
                    <div className="card mt-2" key={content.uuid}>
                        <div className="card-body">
                            <h5 className="card-title">{content.email}</h5>
                            <p className="card-text">{content.message}</p>
                            <p className="card-text"><small className="text-muted">{content.creationdate}</small></p>
                        </div>
                    </div>
                )
            } )}
        </>
    )
}

export default Contatos;
