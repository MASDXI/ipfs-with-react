import React, { Component } from 'react';
import ipfsClient from 'ipfs-http-client';
import './App.css';

const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' })

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      memeHash: 'QmfM2r8seH2GiRaC4esTjeraXEachRt8ZsSeGaWTPLyMoG',
      buffer: null,
    }
  }

  captureFile = (event) => {
    event.preventDefault()
    const file = event.target.files[0]
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend = () => {
      this.setState({ buffer: Buffer(reader.result) })
      console.log('buffer', this.state.buffer)
    }
  }

  onSubmit = async (event) => {
    event.preventDefault()
    console.log('adding file to ipfs...')
    if (this.state.buffer) {
      const result = await ipfs.add(this.state.buffer)
      console.log("CID", result.cid.toString())
      this.setState( {memeHash : result.cid.toString()});
    } else {
      console.error()
    }
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <a
            className="navbar-brand col-sm-3 col-md-2 mr-0"
            href="http://www.dappuniversity.com/bootcamp"
            target="_blank"
            rel="noopener noreferrer"
          >
            Sample IPFS
          </a>
        </nav>
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
                <embed width="800" height="600" 
                  src={`https://ipfs.io/ipfs/${this.state.memeHash}`}
                  key={this.state.memeHash} />
                <p>&nbsp;</p>
                <a
                  className="navbar-brand col-sm-3 col-md-2 mr-0"
                  href={`https://ipfs.io/ipfs/${this.state.memeHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View on IPFS gateway
                </a>
                <h2>Change Picture</h2>
                <form onSubmit={this.onSubmit} >
                  <input type='file' onChange={this.captureFile} />
                  <input type='submit' />
                </form>
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
