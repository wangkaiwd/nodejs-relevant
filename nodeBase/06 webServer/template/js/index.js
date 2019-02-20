console.log('我被加载了');
const h4 = document.createElement('h4');
const index = document.getElementsByClassName('index')[0];
h4.innerHTML = '我是通过js创建的h4标签';
index.appendChild(h4);
