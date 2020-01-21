import React, { Component } from 'react'
import axios from 'axios'

export default class CSVupload extends Component {
  state = {
    selectedFile: null
  }

onChangeHandler=event=>{
  this.setState({
    selectedFile: event.target.files[0]
  })
}
onClickHandler = () => {
  const data = new FormData()
  data.append('file', this.state.selectedFile)
  axios.post("http://localhost:5000/upload", data)
  .then(res => { 
    console.log(res.statusText)
  })
}
  render() {
    return (
      <div class="container">
        <div class="row">
          <div class="offset-md-3 col-md-6">
            <div class="form-group files">
              <label>upload your file</label>
              <input type="file" name="file" onChange={this.onChangeHandler}/>
            </div>
            <button type="button" onClick={this.onClickHandler}>Upload</button>
          </div>
        </div>
      </div>
    )
  }
}
