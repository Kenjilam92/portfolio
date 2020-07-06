import React,{useState} from "react";
import axios from "axios";

const SendMessage = props => {
  const [Name,setName] = useState("");
  const [Email,setEmail] = useState("");
  const [Phone,setPhone] = useState("");
  const [Text,setText] = useState("");
  const [Errors,setErrors] = useState ({
    "Name" : "",
    "Email": "",
    "Phone" : "",
    "Text"  : ""
  });

  const Send = e => {
    e.preventDefault();
    const newMessage ={
      "Name" : Name,
      "Email": Email,
      "Phone" : Phone,
      "Text"  : Text,
    };
    axios.post("/api/messages/new",newMessage)
      .then(res => {
        if(res.data.errors)
        {
          setErrors(res.data.errors);
        }
        else
        { setName("");
          setPhone("");
          setEmail("");
          setText("");
          setErrors({
            "Name" : "",
            "Email": "",
            "Phone" : "",
            "Text"  : ""
          });
        }
      })
      .catch(err => console.log(err));
  };
  
  return (
    <form onSubmit={Send}>
      <p className="mb-4 h5"><b className="text-warning">Please leave me a messages!</b></p>
      <div className="row">
        <div className="form-group col-md-6">
          <label htmlFor="Name" >Name: </label>
          <input  type="text" 
                  className="form-control" 
                  value={Name}
                  onChange={e=> setName(e.target.value)} 
          />
          <p className="text-warning">{Errors.Name? Errors.Name[0] : null}</p>
          <label htmlFor="Email">Email:</label>
          <input  type="text" 
                  className="form-control" 
                  value={Email}
                  onChange={e=> setEmail(e.target.value)}
          />
          <p className="text-warning">{Errors.Email? Errors.Email[0] : null}</p>
          <label htmlFor="Phone">Phone:</label>
          <input  type="text" 
                  className="form-control" 
                  value={Phone}
                  onChange={e=> setPhone(e.target.value)}
          />
          <p className="text-warning">{Errors.Phone? Errors.Phone[0] : null}</p>
        </div>
        <div className="form-group col-md-6 d-flex flex-column">
          <label htmlFor="Text">Text:</label>
          <textarea className="form-control" 
                    cols="30" rows="6"
                    value={Text}
                    onChange={e=>setText(e.target.value)}
                    >
          </textarea>
          <p className="text-warning">{Errors.Text? Errors.Text[0] : null}</p>
          <button className="btn btn-success mt-2 align-self-end" type="submit">Send</button>
        </div>
      </div>
    </form>
);
}

export default SendMessage;