import { Link } from "react-router-dom"
const EditContact = () => {
  return (
<div>
      <section className="edit-contact p-3">
        <div className="container">
          <div className="row">
            <div className="col">
              <p className="h4 text-success fw-bold">Edit Contact</p>
              <p className="fst-italic">Update an existing Contact from your Contacts list</p>
            </div>
            <div className="row">
              <div className="col-md-4">
               <div className="mb-2"><input type="text" className="form-control-lg" placeholder="Name" /></div> 
               <div className="mb-2"><input type="email" className="form-control-lg"placeholder="Email" /></div> 
               <div className="mb-2"><input type="text" className="form-control-lg" placeholder="Phone" /></div> 
               <div className="mb-2 mx-sm-3">
                    <input type="submit" className="btn btn-success mb-2" value="Edit Contact" /> 
                    <Link to="/ContactList" className="btn btn-dark ms-2">Cancel</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default EditContact