import axios from 'axios';

const localUrl = 'http://localhost:3030/investors';
const remoteUrl = 'https://parallelm.herokuapp.com/investors';
const baseUrl = localUrl;

const investorService = {};

investorService.getAll = () => {
    return axios.get(baseUrl);
}

investorService.addDocuments = (docs) => {
    return axios.post(`${baseUrl}/upload`, docs, {})
    // .then(res => console.log(res));
}

investorService.addInvestor = (investor) => {
    return axios.post(baseUrl, {...investor})

}


export default investorService;