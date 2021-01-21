# ipfs-with-react

# InterPlanetary File System
Tutorial using IPFS with nodejs
To run these tutorials, you must have the following installed:
- [nodejs](https://nodejs.org/en/)
- [nvm](https://github.com/nvm-sh/nvm)
- [go-ipfs](https://github.com/ipfs/go-ipfs)
  If you want to call with your local ipfs.

``` bash
# clone repository and install
git clone https://github.com/MASDXI/ipfs-nodejs.git

cd ipfs-nodejs

npm install
```

Before starting you need to insert `<FILE_URL>` or `<FILE_PATH>` in `index.js`
``` javascript
import ipfsClient from 'ipfs-http-client';

const IPFS_INFURA = { host:'ipfs.infura.io', port:5001, protocol:'https' }
const IPFS_LOCAL = { host:'localhost', port:5001, protocol:'http' }
const { urlSource, globSource } = ipfsClient
const ipfs = ipfsClient(IPFS_INFURA);

const addURL = async (url) => {
    const result = await ipfs.add(urlSource(url));
    console.log("View on ipfs gateway:",'https://ipfs.io/ipfs/' + ((result.cid).toString()));
}

const addSRC = async (path) => {
    const option = {
        recursive: false
    }
    const result = await ipfs.add(globSource(path, option));
    console.log("View on ipfs gateway:",'https://ipfs.io/ipfs/' + ((result.cid).toString()));
}

//change here!
addURL('<FILE_URL>');
addSRC('<FILE_PATH>');

```

``` bash
# for add file to IPFS
npm run start
```

``` bash
# expecting output
View on ipfs gateway: https://ipfs.io/ipfs/Qm...

# example result
# View on ipfs gateway: https://ipfs.io/ipfs/QmUCTkyFkg6ScFeHzNwYDSoUnCYtejiJZdZQtXw5RtU5bW
```

Example result [here](https://ipfs.io/ipfs/QmUCTkyFkg6ScFeHzNwYDSoUnCYtejiJZdZQtXw5RtU5bW)
