let a = document.querySelector('.intro_bloks')
let header = document.querySelector('.header')

// window.addEventListener('scroll',()=>
// {

// if(window.pageYOffset - a.clientHeight >= a.getBoundingClientRect().y + window.pageYOffset)
// {
//     document.querySelector('header').style.cssText =  `transform : rotateX(0deg) translateY(0px) translateZ(0px);
//     position:sticky`
// }
// else if (window.pageYOffset <= header.clientHeight)
// {
//     document.querySelector('header').style.cssText =  `transform : rotateX(0deg) translateY(0px) translateZ(0px);
//     position:sticky`
// }
// else{
//     document.querySelector('header').style.cssText =  `transform: rotateX(-90deg) translateY(45px) translateZ(-60px);
//     position:sticky;`
// }
// })

let positionNow = 0
window.addEventListener('scroll',()=>
{
    if(window.pageYOffset > positionNow)
    {
        console.log('down')
        document.querySelector('header').style.cssText =  `transform: rotateX(-90deg) translateY(45px) translateZ(-60px);
        position:sticky;`
    }
    else
    {
        console.log('up')
        document.querySelector('header').style.cssText =  `transform : rotateX(0deg) translateY(0px) translateZ(0px);
    position:sticky`
    }
    positionNow = window.pageYOffset
})