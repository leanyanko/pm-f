import React, { Component } from "react";
import './AddInvestor.css';
import investorService from '../services/investorService';

class AddInvestor extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };

        this.addInvestor = this.addInvestor.bind(this);
        this.input = this.input.bind(this);
      }

      input(event) {
        console.log(event.target.name);
        const property = event.target.name;
        if (property === 'file') {
            const files = event.target.files;
            this.setState({files: files})
        }
        else
            this.setState({[property]: event.target.value})
      }

      addInvestor (event) { 
        event.preventDefault();
        const investor = {...this.state };
        investor.files = [];
        let data = new FormData();


        investorService.addInvestor(investor)
            .then((res) => {
              console.log('done', res);
              if (this.state.files)
                      for (let i = 0; i < this.state.files.length; i++) {
                          data.append('file', this.state.files[i], res.data + '-' + this.state.files[i].name); 
                      }

              investorService.addDocuments(data)
                      .then((result) => {
                          console.log('files uploaded');      
                      })
        });
      }

      render() {
          return(<div>
              <form onSubmit={this.addInvestor}>
                  <div className="base">
                    <label>
                      First Name: <input type="text" name="first_name"  onChange={this.input}/>
                    </label>
                    <label>
                        Last Name: <input type="text" name="last_name" onChange={this.input}/>
                    </label>
                    <label>
                        Date of Birth: <input type="date" name="dob" onChange={this.input}/>
                    </label>
                  </div>
                  
                  <div>
                      <div >
                        <label>
                            Street Address: <input className="street" type="text" name="address" onChange={this.input}/>
                        </label>
                      </div>
                    
                    <label>
                       City: <input type="text" name="city" onChange={this.input}/>
                    </label>
                    <label>
                       State: <input type="text" name="state" onChange={this.input}/>
                    </label>
                    <label>
                       Zipcode: <input type="number" name="zipcode" onChange={this.input}/>
                    </label>
                  </div>
                  <div>
                    <label>
                        Document: <input type="file" className="upload" name="file" multiple onChange={this.input} accept="pdf, doc"/>
                    </label>
                  </div>
                  <div>
                      <input type="submit" value="Submit"/>
                  </div>
                  
              </form>
          </div>);
      }
}

export default AddInvestor;