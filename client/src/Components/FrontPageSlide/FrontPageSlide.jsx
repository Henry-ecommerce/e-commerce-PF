import { useEffect, useRef, useState } from "react";
import estilo from "../FrontPageSlide/FrontPageSlide.module.css";

const FrontPageSlide = () => {
  const slide = useRef();
  const [imagenes, setImagenes] = useState([
    "https://wallpaperaccess.com/full/4940877.jpg",
    "https://wallpaperaccess.com/full/2975814.jpg",
    "https://www.wallpaperup.com/uploads/wallpapers/2017/11/03/1147979/f26f9124b3a7f6dffb8a6d996fc0260d-700.jpg",
    "https://wallpaperaccess.com/full/1232924.jpg",
  ]);

  useEffect(()=>{
    let intervalo = setInterval(()=>{
            if(slide.current){let primeraImagen = slide.current?.children[0];
            const trans = () => {
    
                slide.current.style.transition = "none"
                slide.current.style.transform = `translateX(0)`
    
                slide.current.appendChild(primeraImagen);}

            slide.current.style.transition = "transform 2s"
            slide.current.style.transform = `translateX(-${100}%)`

            slide.current.addEventListener("transitionend",trans)}
            else clearInterval(intervalo);
            
        },5000);
    
    },[])

  return (
    <>
      <div className={estilo.contenedor}>
        <div ref={slide} className={estilo.contenedor_imagen}>
          <img src={imagenes[0]} alt="img1" className={estilo.imagen}></img>
          <img src={imagenes[1]} alt="img2" className={estilo.imagen}></img>
          <img src={imagenes[2]} alt="img3" className={estilo.imagen}></img>
          <img src={imagenes[3]} alt="img4" className={estilo.imagen}></img>
        </div>
      </div>
    </>
  );
};

export default FrontPageSlide;
