const axios = require('axios');

const SERVICE_KEY = "tNd%2FZ0MMJA5NZrU9nA5IVTKkhpz6N3j1OGpFT0PmbcCOVEZbpR9PYiNHuD9rLuSsyMWkTXPqHsHLWoxlW%2BVVrg%3D%3D"
const url = "http://apis.data.go.kr/1471000/DrbEasyDrugInfoService/getDrbEasyDrugList";

const updateMedicineInfo = async() => {
    const queryParams = '?' + encodeURIComponent('ServiceKey') + '=' + SERVICE_KEY;
    const pageNum36 = '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent(1)
    const pageNum37 = '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent(2);
    const numOfItem = '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent(2);
    const output = '&' + encodeURIComponent('type') + '=' + encodeURIComponent('json');

    const result36 = await axios.get(url + queryParams + pageNum36 + numOfItem + output);
    const result37 = await axios.get(url + queryParams + pageNum37 + numOfItem + output);

    console.log(result36.data.body.items);
    console.log(result37.data.body.items);
}

updateMedicineInfo();