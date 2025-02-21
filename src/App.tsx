import React, {useRef, useState} from 'react';
import './App.scss';
import {Slider} from "./components/Slider";
import {slideRData} from "./constants";
import {AnimationCircle} from "./components/AnimationCircle";
import gsap from 'gsap';


function App() {
    const [index,setIndex] = useState(0)
    const [degree,setDegree] = useState(60)
    const sliderRef = useRef(null);
    const circleRef = useRef(null);

    const sliderAnimation=()=>{
        gsap.fromTo(
            sliderRef.current,
            { opacity: 0,  },
            { opacity: 1,  duration: 1, ease:'expo.inOut' }
        );
    }
    const circleAnimation = ()=>{
        setDegree(degree + 60)
        gsap.to(circleRef.current, {
            rotation:degree ,
            duration: 0.5,
            ease: "linear",
        });
    }

    const handlePageChange = (type:string)=>{
        if(type === 'desc' && index > 0){
            setIndex(index-1)
            sliderAnimation()
            circleAnimation()
        }else if(type === 'asc' && index<5) {
            setIndex(index+1)
            sliderAnimation()
            circleAnimation()
        }
    }

  return (
    <div className="App">
        <section className='periods-container'>
            <div className='gradient-line'></div>
            <h1 className='header'>Исторические<br/> даты</h1>
            <div className='circle-container'>
                <h2>{slideRData[index][0].year}</h2>
                <AnimationCircle
                    circleRef={circleRef}
                    period={index}
                    setPeriod={setIndex}
                    circleAnimation={circleAnimation}
                />
                <h2>{slideRData[index][slideRData[index].length-1].year}</h2>
            </div>
            <Slider
                ref={sliderRef}
                index={index}
                handlePageChange={handlePageChange}
                data={slideRData[index]}
            />
        </section>
    </div>
  );
}

export default App;
