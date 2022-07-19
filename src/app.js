import './app.css';
import nyancat from './nyancat.jpeg';

document.addEventListener('DOMContentLoaded', () => {
  document.body.innerHTML = `
    <img src="${nyancat}" />
  `
})

console.log(process.env.NODE_ENV); // development
console.log(TWO); // 1+1
console.log(api.doamin); // http://dev.api.domain.com