window.addEventListener('load',()=>{
    document.querySelector('#header-menu .burger').addEventListener('click',(e)=>{
        if(document.getElementById('header-text-btn-wrapper').className.indexOf('show')<0){
            e.currentTarget.classList.add('show');
            document.getElementById('header-text-btn-wrapper').classList.add('show');
        }else{
            e.currentTarget.classList.remove('show');
            document.getElementById('header-text-btn-wrapper').classList.remove('show');
        }
    })
})

