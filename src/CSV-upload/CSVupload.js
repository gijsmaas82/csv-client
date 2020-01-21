import React, { Component } from 'react'
import axios from 'axios'
import { CSVLink } from "react-csv"
import { Form, Button, Table } from 'react-bootstrap'

export default class CSVupload extends Component {
  state = {
    selectedFile: null,
    fileUploaded: false,
    data: [],
    headers: [
      {label: "id", key: "id"},
      {label: "level", key: "level"},
      {label: "cvss", key: "cvss"},
      {label: "title", key: "title"},
      {label: "Vulnerability", key: "Vulnerability"},
      {label: "Solution", key: "Solution"},
      {label: "reference", key: "reference"}
    ]
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
    if (res.statusText === 'OK') {
      this.setState({
        fileUploaded: true
      })
    }  
  })
}

getData = () => {
  axios.get("http://localhost:5000/data")
    .then(res => {
      // console.log(res.data)
      this.setState({
        data: res.data
      })
    })
    .catch(console.error)
}
  render() {
    return (
      <div>
        { !this.state.fileUploaded ?
        <Form>
          <Form.Group>
            <Form.Label>Upload Data</Form.Label>
            <Form.Control type="file" name="file" onChange={this.onChangeHandler}/>
          </Form.Group>
          <Button variant="primary" onClick={this.onClickHandler}>Upload</Button>
        </Form> :
        <div>
        <h3>Click on the button to get the data or click on the link to get a CSV-file.</h3>
        <Button variant="primary" onClick={this.getData}>Get Data</Button>
        <CSVLink data={this.state.data} headers={this.state.headers}>
          Download CSV-file
        </CSVLink>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <td>id</td>
              <td>level</td>
              <td>cvss</td>
              <td>title</td>
              <td>Vulnerability</td>
              <td>Solution</td>
              <td>reference</td>
            </tr>
          </thead>
          <tbody>
            {this.state.data.map(row => {
              return <tr>
                <td>{row.id}</td>
                <td>{row.level}</td>
                <td>{row.cvss}</td>
                <td>{row.title}</td>
                <td>{row.Vulnerability}</td>
                <td>{row.Solution}</td>
                <td>{row.reference}</td>
              </tr>
            })}
          </tbody>
        </Table>
        </div>
        }
      </div>
    )
  }
}
