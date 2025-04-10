//variaveis do menu
let sliderTheme = document.querySelector(".slider-theme")
let darkTheme = document.querySelector(".dark-theme")
let lightTheme = document.querySelector(".light-theme")
let bg = document.body

// variaveis do formulario
let signup = document.querySelector(".signup")
let login = document.querySelector(".login")
let slider = document.querySelector(".slider")
let formBox = document.querySelector(".form-box")
let formSignUp = document.querySelector(".form-signup")
let formLogin = document.querySelector(".form-login")



signup.addEventListener("click", () => {
  slider.classList.add("moveslider")
  if (formSignUp.style.display === "none" || formSignUp.style.display === ""){
    formSignUp.style.display = ("block")
    formLogin.style.display = ("none")}
    formBox.classList.add("move-formbox")})


login.addEventListener("click", () => {
  slider.classList.remove("moveslider")
  if (formLogin.style.display === "none" || formLogin.style.display === ""){
    formLogin.style.display = ("block")
    formSignUp.style.display = "none"
    }
    formBox.classList.remove("move-formbox")
  }
  )

lightTheme.addEventListener("click", () => {
  bg.style.backgroundColor = "#e3dae8"
    sliderTheme.classList.add("move-slider-theme")
} )

darkTheme.addEventListener("click", () => {
    bg.style.backgroundColor = "#321838"
    sliderTheme.classList.remove("move-slider-theme")
})