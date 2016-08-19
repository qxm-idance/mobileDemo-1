// require('style!css!../style/main.css');
import '../style/main.css';
import './util/polyfill.js';

const status = document.getElementById('J-Status');
const ol = document.querySelectorAll('.J-D');
console.log(ol);
const setStyle = (ol, len) => {
    let docEl = document.documentElement;
    let style = document.createElement('style');
    docEl.firstElementChild.appendChild(style);
    let hei = ol.offsetHeight;
    console.log(hei);
    ol.parentNode.style.cssText = `;-webkit-animation: marquees ${len}s linear infinite; animation: marquees ${len}s linear infinite;`
    style.innerHTML = `@-webkit-keyframes marquees {from {-webkit-transform: translate(0, 0);  transform: translate( 0, 0); }to {  -webkit-transform: translate(0, -${hei}px); transform: translate(0, -${hei}px);} }@keyframes marquees {from {-webkit-transform: translate(0, 0);transform: translate(0, 0);}to {-webkit-transform: translate(0, -${hei}px);transform: translate(0, -${hei}px);}}`;
};

function getData(){
	var res = [{'records':'张三：187 xxxx 7777   100'},
	{'records':'李四：187 xxxx 9999   200'},
	{'records':'王二：187 xxxx 6666   300'},
	{'records':'王yi：187 xxxx 1111   300'},
	{'records':'王er：187 xxxx 2222   300'},
	{'records':'王sa：187 xxxx 5555   300'},
	{'records':'王si：187 xxxx 4444   300'}]

		
	if(res && res.length>0){
		let tmp = [];
		res.map(it => {
			tmp.push(`<li>${it.records}</li>`)
		})

		Array.prototype.slice.call(ol).map(it => {
            it.innerHTML = tmp.join('');
        });

        if (res.length < 4) {
	        ol[0].parentNode.removeChild(ol[1]);
	    } else {
	        setStyle(ol[0], res.length);
	    }

	}

	
}

getData();

