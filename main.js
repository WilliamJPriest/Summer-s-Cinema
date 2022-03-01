// import {config} from 'config.js';

const API_KEY = config.MY_API_KEY;
const BASE_URL= 'https://api.themoviedb.org/3'
let fillIn ="movie?";
const API_URL=  BASE_URL+'/discover/movie?sort_by=popularity.desc'+API_KEY
const IMG_URL= 'https://image.tmdb.org/t/p/w500/'
let  SEARCHING= 'https://api.themoviedb.org/3/search/'+fillIn+API_KEY+"&query=";
const tvShow_URL= BASE_URL+'/discover/tv?sort_by=popularity.desc'+API_KEY;
let GENRES_URL= BASE_URL+'/genre/movie/list?'+API_KEY;
// let genresBTN= Array.from(document.querySelectorAll(".genresBTN"))
// let Genres = document.querySelector(".Genres")let searchTerm = search.value;
let pageNum=1;



const homepage= document.querySelector(".homepage")
const allGenres= document.querySelector(".allGenres")
const form= document.getElementById("form")
const search= document.getElementById("search")
const searchBTN=document.querySelector(".search-btn")
const nextBTN = document.querySelector(".nextBTN")
const previousBTN = document.querySelector(".previousBTN")
const tvShowBTN = document.querySelector(".TV")
const movieBTN =document.querySelector(".movies")
let searchTerm= search.value;

getMovies(API_URL)

function getMovies(url){

    fetch(url).then(res=>res.json()).then(data =>
        showMovies(data.results,data.page));

}

function showMovies(data){
    homepage.innerHTML="";


    data.forEach(movieTV =>{
        const {title, name,poster_path,vote_average, overview}=movieTV;
        const newElement= document.createElement("article");
        newElement.classList.add("movie-container")
        newElement.innerHTML=
        `
        <img src="${IMG_URL + poster_path}" alt="">
            <div class="movie-desc">
                <h2>${title ||name}</h2>
                <span class="${getColor(vote_average)}">${(vote_average)}</span>  
                <div class="overview">
                    <h3>${title||name}</h3>
                    <p>${overview}</p>
                </div>
              
            </div>
        `
        homepage.appendChild(newElement);
    })
 }    
// getGenres(GENRES_URL)

// function getGenres(url){
//     fetch(url).then(res=>res.json()).then(data =>
//         showGenres(data.genres));

// }

// function showGenres(data){
//     allGenres.innerHTML="";


//     data.forEach(genres =>{
//         const {id,name}=genres;
//         const genElement= document.createElement("article");
//         genElement.classList.add=("Genres")
//         genElement.innerHTML=
//         `
//         <button class="genresBTN" data-value="${id}">${name}</button>
//         `
//         allGenres.appendChild(genElement)
      
//     }
//  )}


function getColor(vote){
    if(vote>=8){
        return 'green'
    }else if(vote>=5){
        return 'orange'
    }else{
        return "red"


    }
}

let PAGE_URL="https://api.themoviedb.org/3/movie/popular?"+API_KEY+`&page=`;
const pageInfo= document.querySelector(".pageInfo")




 nextBTN.addEventListener("click",()=>{
    if (pageNum==500){
        pageNum=500;
    } else if(search.value){
        pageNum++;
        searchTerm=search.value;
        console.log(searchTerm)
        getMovies(BASE_URL+ "/search/"+fillIn+API_KEY+"&page="+pageNum+"&query="+searchTerm)
        window.scrollTo(0,0)
        pageInfo.innerHTML=
       `${pageNum}`
        
    
    }else{
        pageNum++;
        PAGES_URL=PAGE_URL+pageNum;
        getMovies(PAGES_URL);
        PAGES_URL=PAGE_URL;
        window.scrollTo(0,0)
        pageInfo.innerHTML=
        ` ${pageNum}`
        
    }
   
})
 previousBTN.addEventListener("click",()=>{
     if (pageNum==1){
         pageNum=1;
     }else if(search.value){
        pageNum--;
        getMovies(BASE_URL+ "/search/"+fillIn+API_KEY+"&page="+pageNum+"&query="+searchTerm)
        window.scrollTo(0,0)
        pageInfo.innerHTML=
        ` ${pageNum}`
     }else{
        pageNum--;
        PAGES_URL=PAGE_URL+pageNum;
        getMovies(PAGES_URL);
        PAGES_URL=PAGE_URL;
        window.scrollTo(0,0)
        pageInfo.innerHTML=
        ` ${pageNum}`
        
    }
 

 })
 tvShowBTN.addEventListener("click",()=>{
    PAGE_URL="https://api.themoviedb.org/3/tv/popular?"+API_KEY+`&page=`
    fillIn="tv?"
    GENRES_URL= BASE_URL+'/genre/tv/list?'+API_KEY;
    getMovies(tvShow_URL)
    search.value="";
    search.placeholder="Search TV shows...";
    pageNum=1;
    pageInfo.innerHTML=
        ` ${pageNum}`
 })

 movieBTN.addEventListener("click",()=>{
    PAGE_URL="https://api.themoviedb.org/3/movie/popular?"+API_KEY+`&page=`
    fillin="movie?"
    GENRES_URL= BASE_URL+'/genre/movie/list?'+API_KEY;
    getMovies(API_URL)
    search.value="";
    search.placeholder="Search Movies..";
    pageNum=1;
    pageInfo.innerHTML=
        ` ${pageNum}`
    
 })



form.addEventListener('submit',(e)=>{
    e.preventDefault();
     searchTerm = search.value;

    if(searchTerm){
        pageNum=1;
        getMovies(SEARCHING+searchTerm)
        pageInfo.innerHTML=
        ` ${pageNum}`
    
        
        
    }else{
        pageNum=1;
        getMovies(API_URL);
        pageInfo.innerHTML=
        ` ${pageNum}`
    
    }
})



// genresBTN.addEventListener("click",(e)=>{
//     for(let i=0; i> Genres.length; i++){
//         let genreID= genresBTN.dataset.value;
//         const Genres_Search=BASE_URL+'/discover/movie?with_genres='+[genreID]+API_KEY;
//         getMovies(Genres_Search)
//         console.log(Genres_Search)
//     }
    
//  })

