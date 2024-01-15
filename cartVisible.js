renderGoods(cart)
totalPrice()
function renderGoods(array)
{
    let div = document.createElement('div')
    div.className = 'left_section_card_items'

    for(let i =0; i < array.length; i++)
    {
        let product = array[i]
        
        let BtnMin = document.createElement('button')
        BtnMin.className = 'minus'
        BtnMin.textContent = '-'
        BtnMin.addEventListener('click', DownCountGoods(product.id))
        let BtnMax = document.createElement('button')
        BtnMax.className = 'plus'
        BtnMax.textContent = '+'
        BtnMax.addEventListener('click', UpCountGoods(product.id))

        let div3 = document.createElement('div')
        div3.className = 'card_items_first'
        div3.dataset.id = `${product.id}`
        div3.addEventListener('mouseenter', changeCurrentPrice)
        div3.addEventListener('mouseleave', returnCurentPriceToNull)
      
        let btnDelete = document.createElement('button')
        btnDelete.className = 'delete-all'
        btnDelete.innerHTML = `<img src='image/Без названия 1.svg' alt="delete" />`
        btnDelete.addEventListener('click', deleteCurrentGood(product.id, array))

        let input = document.createElement('input')
        input.className = 'uno'
        input.value = product.count
        
        input.addEventListener('input', changeCountWithInputValue(product.id))

        let div2 = document.createElement('div')
        div2.append(div3)
        div3.innerHTML = `
        
                    <div class="image_card_items_first">
                      <img src='${product.img}'  alt="product" />
                    </div>
                    <div class="card__text">
                      <div class="card__text__first">
                        <h2>${product.name}</h2>
                        
                      </div>
                      <div class="card__text__second">
                        <p>${product.size}</p>
                      </div>
                      <div class="card__text__third">
                        <div class="span">
                          <div class="btnPM">
                          
                        </div>

                        </div>
                        <div class='prices'>
                        <span>$ </span><span class='price__towar'>${product.price}</span>
                        </div>
                      </div>
                  
                  </div>`
                  div3.querySelector('.card__text__first').append(btnDelete)
                  div3.querySelector('.btnPM').append(input)
                  div2.querySelector('.btnPM').append(BtnMax)
                  div2.querySelector('.btnPM').prepend(BtnMin)
                  div.append(div2)
    }
    
    document.querySelector('.left_section_card').append(div)
}

function UpCountGoods(id)
{
  return ()=>
  {
    for(let i = 0; i < cart.length; i++)
    {
        if(id === cart[i].id)
        {
            cart[i].count++
        }
       
    }
    changeCount(id, cart)
    changePrice(id, cart)
    console.log(cart)
  }
}

function DownCountGoods(id)
{
  return ()=>
  {
    for(let i = 0; i < cart.length; i++)
    {
        if(id === cart[i].id)
        {
  
                cart[i].count--
                if(cart[i].count < 1)
                {
                    document.querySelector(`[data-id='${cart[i].id}`).remove()
                }
                cart = cart.filter((el)=>
                {
                    if(el.count >= 1)
                    {
                        return el
                    }
                })
            
            
        }
       
    }
    changeCount(id, cart)
    changePrice(id, cart)
    console.log(cart)
  }
}

function changeCount(id, array)
{
    let elem
    if(document.querySelector(`[data-id='${id}']`))
    {
        elem = document.querySelector(`[data-id='${id}']`).querySelector('.uno')
    } 
    for(let i = 0; i < array.length; i++)
    {
        if(id === array[i].id)
        {
        // elem.innerHTML = `${array[i].count}`
        elem.value = `${array[i].count}`
        }
    }
}

function changePrice(id, array)
{
    let elem
    if(document.querySelector(`[data-id='${id}']`))
    {
        elem = document.querySelector(`[data-id='${id}']`).querySelector('.price__towar')
        
    }
    for(let i = 0; i < array.length; i++)
    {
        if(id === array[i].id)
        {
        elem.innerHTML = `${array[i].price * array[i].count}`
        }
    }
    
    if(elem)
    {
    document.querySelector('.priceCurrent').innerHTML = `$ ${elem.innerHTML}`
    }
    else{
    document.querySelector('.priceCurrent').innerHTML = `$ 00.00`
    }
    totalPrice()
}

function totalPrice()
{
    let prices = document.querySelectorAll('.price__towar')
    let numb = 0
    prices.forEach((el)=>
    {  
        numb += parseFloat(el.textContent) 
    })

    document.querySelector('.finalResult').textContent = `$ ${numb}`
}

function changeCurrentPrice()
{
    document.querySelector('.priceCurrent').innerHTML = `$ ${this.querySelector('.price__towar').innerHTML}`
}

function returnCurentPriceToNull()
{
    document.querySelector('.priceCurrent').innerHTML = `$ 00.00`
}

function deleteCurrentGood(id, arr)
{
    return ()=>
    {
        for(let i = 0 ; i < arr.length; i++)
        {
            if(id === arr[i].id)
            {
                arr[i].count = 0
            }
        }
        DownCountGoods(id)()
        console.log(cart)
    }
    
}

function  changeCountWithInputValue(id)
{
    return function()
    {   
        let str 
        
        if(Boolean(parseFloat(event.data)))
        {
            if(event.target.value.length <= 2)
            {
                str = event.target.value    
            }
          
            else {
                str = event.target.value[0] +event.target.value[1]
            }
        }
    
        for(let i = 0; i < cart.length; i++)
        {
            if(id === cart[i].id)
            {
                cart[i].count = str ? parseFloat(str) : ''
                
            }
        }
      
        changeCount(id, cart)
        changePrice(id, cart)
        console.log(cart)
    }
}