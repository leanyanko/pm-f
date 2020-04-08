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
            // console.log(event.target.files[0]);
            const files = event.target.files;
            this.setState({files: files})
        }
        else
            this.setState({[property]: event.target.value})
      }

      addInvestor (event) { 
        event.preventDefault();
        // const { first, last, dob, street, city, state, zipcode, file } = {...this.state};
        // const investor = { first, last, dob, street, city, state, zipcode };
        const investor = {...this.state };
        investor.files = [];
        let data = new FormData();
        // investor.forEach((property) => data.append([property], property));
        // data.append('file', this.state.file);
        if (this.state.files)
        for (let i = 0; i < this.state.files.length; i++) {
            data.append('file', this.state.files[i]); 
        }
        // for (const property in investor) {
        //     console.log(property);
        //     console.log(this.state[property]);
        //     data.append([property], this.state[property]);
        // }
        investorService.addDocuments(data)
        .then((result) => {
            console.log('files uploaded');
            // investorService.addInvestor(JSON.stringify(investor));
            investorService.addInvestor(investor)
            .then((res) => (console.log('done', res)));
       
        })
        console.log(JSON.stringify(investor));
        

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