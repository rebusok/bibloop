export default class Customizator{
    constructor(){
        this.btnBlock = document.createElement('div');
        this.colorPinker = document.createElement('input');
        this.scale = localStorage.getItem('scale') || 1;
        this.clear = document.createElement('div');
        this.color = localStorage.getItem('color') || '#ffffff';

        this.btnBlock.addEventListener('click', (e) => {
            this.onScaleChange(e);
        });
        this.colorPinker.addEventListener('input', (e) => {
            this.onColorChange(e);
        });
        this.clear.addEventListener('click', () => {
            this.reset();
        });
    }

    onScaleChange(e){
        const body = document.querySelector('body');
        if (e){
            this.scale = +e.target.value.replace(/x/g, '');
        }

        const recursy = (elem) =>{
            elem.childNodes.forEach(nod => {
                if(nod.nodeName === '#text' && nod.nodeValue.replace(/\s+/g, '').length > 0){

                    if(!nod.parentNode.getAttribute('data-fz')){
                        let value = window.getComputedStyle(nod.parentNode, null).fontSize;
                        nod.parentNode.setAttribute('data-fz', +value.replace(/px/g, ''));
                        nod.parentNode.style.fontSize = nod.parentNode.getAttribute('data-fz') * this.scale + 'px';
                    } else {
                        nod.parentNode.style.fontSize = nod.parentNode.getAttribute('data-fz') * this.scale + 'px';
                    }


                } else {
                    recursy(nod);
                }
            });
        }
        recursy(body);

        localStorage.setItem('scale', this.scale);
    }
    onColorChange(e){
        const body = document.querySelector('body');
        body.style.backgroundColor  = e.target.value;
        localStorage.setItem('color', e.target.value);
    }

    setBgColor(){
        const body = document.querySelector('body');
        body.style.backgroundColor  = this.color;
        this.colorPinker.value = this.color;
    }
    reset() {
        localStorage.clear();
        this.scale = 1;
        this.color = '#ffffff';
        this.setBgColor();
        this.onScaleChange();
    }

    injectStyle(){
        const style = document.createElement('style');

        style.innerHTML = `
            .panel {
                display: flex;
                justify-content: space-around;
                align-items: center;
                position: fixed;
                top: 10px;
                right: 0;
                border: 1px solid rgba(0,0,0, .2);
                box-shadow: 0 0 20px rgba(0,0,0, .5);
                width: 300px;
                height: 60px;
                background-color: #fff;
            
            }
            
            .scale {
                display: flex;
                justify-content: space-around;
                align-items: center;
                width: 100px;
                height: 40px;                
            }
            .scale_btn {
                display: block;
                width: 40px;
                height: 40px;
                border: 1px solid rgba(0,0,0, .2);
                border-radius: 4px;
                font-size: 18px;
            }
            .clear{
                font-size: 20px;
                cursor: pointer;
            }
        `;
        document.querySelector('head').appendChild(style);
    }

    render(){
        this.injectStyle();
        this.setBgColor();
        this.onScaleChange();

        let scaleInputS= document.createElement('input'),
            scaleInputM = document.createElement('input'),
            panel = document.createElement('div');
        


        panel.append(this.btnBlock, this.colorPinker, this.clear);
        this.clear.innerHTML = '&times';
        this.clear.classList.add('clear');


        scaleInputS.classList.add('scale_btn');
        scaleInputM.classList.add('scale_btn');
        this.btnBlock.classList.add('scale');

        

        this.btnBlock.append(scaleInputS, scaleInputM);
        this.colorPinker.classList.add('color');

        scaleInputS.setAttribute('type', 'button');
        scaleInputM.setAttribute('type', 'button');
        scaleInputS.setAttribute('value', '1.0x');
        scaleInputM.setAttribute('value', '1.5x');
        this.colorPinker.setAttribute('type', 'color');
        this.colorPinker.setAttribute('value', '#ffffff');


        panel.classList.add('panel');

        document.querySelector('body').append(panel);

        // console.log(this.btnBlock, scaleInputS, scaleInputM);
    }
}