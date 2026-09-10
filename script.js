const products = [
  {id:1,name:"Decorative Bottle",price:100,badge:"Best Seller",img:"IMG-20260910-WA0004.jpg",availability:"Available in all colors",desc:"Beautiful handcrafted decorative bottle. Perfect for gifting, home decor or personal use.",rating:"★★★★★"},
  {id:2,name:"Handmade Candle",price:180,badge:"Popular",emoji:"🕯️",availability:"Multiple fragrances",desc:"A charming handmade candle to add warmth and character to your space.",rating:"★★★★★"},
  {id:3,name:"Mini Gift Hamper",price:299,badge:"Gift Pick",emoji:"🎁",availability:"Ready to gift",desc:"A cute collection of little handmade surprises for someone special.",rating:"★★★★☆"},
  {id:4,name:"Decorative Frame",price:249,badge:"New",emoji:"🖼️",availability:"Custom designs",desc:"Handcrafted decorative frame for memories, quotes and thoughtful gifts.",rating:"★★★★★"},
  {id:5,name:"Resin Keychain",price:99,badge:"Budget Pick",emoji:"🔑",availability:"Custom colors",desc:"Lightweight handmade keychains with unique details and finishes.",rating:"★★★★☆"},
  {id:6,name:"Handmade Flower",price:149,badge:"Bestseller",emoji:"🌸",availability:"Many colors",desc:"A lasting handmade flower that makes a lovely little gift.",rating:"★★★★★"}
];

let cart = JSON.parse(localStorage.getItem("ucb-cart") || "[]");

const grid = document.getElementById("productGrid");
const count = document.getElementById("cartCount");
const drawer = document.getElementById("cartDrawer");
const overlay = document.getElementById("overlay");
const cartItems = document.getElementById("cartItems");
const total = document.getElementById("cartTotal");

function renderProducts(list = products){
  grid.innerHTML = list.map(p => `
    <article class="product">
      <div class="product-media">
        ${p.img ? `<img src="${p.img}" alt="${p.name}">` : `<div class="emoji-art" aria-hidden="true">${p.emoji}</div>`}
        <span class="badge">${p.badge}</span>
      </div>
      <div class="product-info">
        <h3>${p.name}</h3>
        <div class="price">₹${p.price}</div>
        <span class="availability">${p.availability}</span>
        <p class="desc">${p.desc}</p>
        <div><span class="rating">${p.rating}</span><span class="stock">● In Stock</span></div>
        <button class="add" data-id="${p.id}">🛒 &nbsp; Add to Cart</button>
      </div>
    </article>`).join("");
  document.getElementById("emptyState").hidden = list.length !== 0;
}
function save(){localStorage.setItem("ucb-cart",JSON.stringify(cart))}
function renderCart(){
  count.textContent = cart.reduce((s,i)=>s+i.qty,0);
  if(!cart.length){cartItems.innerHTML='<p style="text-align:center;color:#777;padding:35px 10px">Your cart is empty.<br>Add something handmade ✨</p>'}
  else cartItems.innerHTML=cart.map(i=>`<div class="cart-row">
    ${i.img?`<img src="${i.img}" alt="">`:`<div style="width:58px;height:58px;display:grid;place-items:center;background:#f4f4f4;border-radius:7px;font-size:30px">${i.emoji}</div>`}
    <div><strong>${i.name}</strong><small>₹${i.price} × ${i.qty}</small></div>
    <button class="remove" data-remove="${i.id}">Remove</button>
  </div>`).join("");
  total.textContent="₹"+cart.reduce((s,i)=>s+i.price*i.qty,0);
}
function openCart(){drawer.classList.add("open");overlay.classList.add("show");drawer.setAttribute("aria-hidden","false")}
function closeCart(){drawer.classList.remove("open");overlay.classList.remove("show");drawer.setAttribute("aria-hidden","true")}
function addToCart(id){
  const p=products.find(x=>x.id===id), existing=cart.find(x=>x.id===id);
  if(existing) existing.qty++; else cart.push({...p,qty:1});
  save();renderCart();openCart();
}
grid.addEventListener("click",e=>{const b=e.target.closest(".add");if(b)addToCart(Number(b.dataset.id))});
cartItems.addEventListener("click",e=>{const b=e.target.closest("[data-remove]");if(!b)return;cart=cart.filter(x=>x.id!==Number(b.dataset.remove));save();renderCart()});
document.getElementById("cartBtn").onclick=openCart;
document.getElementById("closeCart").onclick=closeCart;
overlay.onclick=closeCart;
document.getElementById("checkoutBtn").onclick=()=>alert("Checkout is ready to connect to your preferred payment/order system.");
document.getElementById("menuBtn").onclick=()=>document.getElementById("mainNav").classList.toggle("open");
document.querySelectorAll(".nav a").forEach(a=>a.addEventListener("click",()=>document.getElementById("mainNav").classList.remove("open")));
document.getElementById("searchBtn").onclick=()=>{const p=document.getElementById("searchPanel");p.classList.toggle("show");if(p.classList.contains("show"))document.getElementById("searchInput").focus()};
document.getElementById("searchInput").addEventListener("input",e=>{const q=e.target.value.toLowerCase().trim();renderProducts(products.filter(p=>(p.name+" "+p.desc+" "+p.availability).toLowerCase().includes(q)))});
document.getElementById("viewAllBtn").onclick=()=>{document.getElementById("searchInput").value="";renderProducts();document.getElementById("shop").scrollIntoView({behavior:"smooth"})};
renderProducts();renderCart();
