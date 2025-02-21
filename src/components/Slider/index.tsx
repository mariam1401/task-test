import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { Swiper, SwiperSlide } from 'swiper/react';
import styles from './index.module.scss';
import React, { useEffect, useState } from 'react';
import 'swiper/css';

export const Slider = ({ data,index,handlePageChange,ref }: {ref:any, data: IPeriodItem[],index:number,handlePageChange:(i:string)=>void }) => {
    const [swiperInstance, setSwiperInstance] = useState<any>(null);
    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);
    const [slidesPerView, setSlidesPerView] = useState(3);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 780) {
                setSlidesPerView(1.5);
            } else {
                setSlidesPerView(3);
            }
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div>
            {slidesPerView === 3 &&
            <div className='slider-navigation-container'>
                <span>0{index+1}/06</span>
                <div className='slider-navigation-btns'>
                    <button
                        style={{opacity:index === 0 ? '0.5' : '1'}}
                        onClick={()=>handlePageChange('desc')}
                    >
                        <IoIosArrowBack/>
                    </button>
                    <button
                        style={{opacity:index === 5 ? '0.5' : '1'}}
                        onClick={()=>handlePageChange('asc')}
                    >
                        <IoIosArrowForward/>
                    </button>
                </div>
            </div>
            }
            <div className={styles.sliderContainer} ref={ref}>
                {!isBeginning && (
                    <button onClick={() => swiperInstance?.slidePrev()}>
                        <IoIosArrowBack />
                    </button>
                )}
                <Swiper
                    spaceBetween={slidesPerView === 1.5 ? 40 : 80}
                    slidesPerView={slidesPerView}
                    onSwiper={(swiper: any) => {
                        setSwiperInstance(swiper);
                        setIsBeginning(swiper.isBeginning);
                        setIsEnd(swiper.isEnd);
                        setActiveIndex(swiper.activeIndex); // Set initial index
                    }}
                    onSlideChange={(swiper: any) => {
                        setIsBeginning(swiper.isBeginning);
                        setIsEnd(swiper.isEnd);
                        setActiveIndex(swiper.activeIndex); // Update active index
                    }}
                >
                    {data.map((el, index) => (
                        <SwiperSlide key={index}>
                            <h3 className={styles.title}>{el.year}</h3>
                            <p className={styles.text}>{el.text}</p>
                        </SwiperSlide>
                    ))}
                </Swiper>

                {!isEnd && (
                    <button onClick={() => swiperInstance?.slideNext()}>
                        <IoIosArrowForward />
                    </button>
                )}
            </div>
            {slidesPerView === 1.5 && (
                <div className={styles.pagination_ctn}>
                    <div className='slider-navigation-container'>
                        <span>0{index+1}/06</span>
                        <div className='slider-navigation-btns'>
                            <button
                                style={{opacity:index === 0 ? '0.5' : '1'}}
                                onClick={()=>handlePageChange('desc')}
                            >
                                <IoIosArrowBack/>
                            </button>
                            <button
                                style={{opacity:index === 5 ? '0.5' : '1'}}
                                onClick={()=>handlePageChange('asc')}
                            >
                                <IoIosArrowForward/>
                            </button>
                        </div>
                    </div>

                    <div className={styles.customPagination}>
                        {data.map((_, index) => (
                            <span
                                key={index}
                                className={`${styles.paginationDot} ${index === activeIndex ? styles.activeDot : ''}`}
                                onClick={() => swiperInstance?.slideTo(index)}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};
