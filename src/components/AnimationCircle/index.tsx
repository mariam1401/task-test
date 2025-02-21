import styles from './index.module.scss';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';

export const AnimationCircle = ({
    circleRef,
    period,
    setPeriod,
    circleAnimation
}: {
    circleAnimation:()=>void,
    circleRef: any,
    period: number,
    setPeriod: (el: number) => void
}) => {

    const btnRefs = useRef<(HTMLButtonElement | null)[]>([]);

    useEffect(() => {
        btnRefs.current.forEach((btn,) => {
            if (!btn) return;
            const handleMouseEnter = () => {
                gsap.to(btn, {
                    width: "56px",
                    height: "56px",
                    background: 'white',
                    border: "1px solid #42567A",
                    duration: 0.5,
                    ease: "power2.out",
                    color: '#42567A'
                });
            };
            const handleMouseLeave = () => {
                gsap.to(btn, {
                    width: "6px",
                    height: "6px",
                    background: '#42567A',
                    duration: 0.5,
                    color: 'transparent',
                    ease: "power2.out",
                });
            };
                btn.addEventListener('mouseenter', handleMouseEnter);
                btn.addEventListener('mouseleave', handleMouseLeave);

            return () => {
                btn.removeEventListener('mouseenter', handleMouseEnter);
                btn.removeEventListener('mouseleave', handleMouseLeave);
            };
        });
    }, [period]);

    return (
        <div className={styles.circle} ref={circleRef}>
            {Array.from({ length: 6 }).map((_, index) => (
                <div  className={styles.circleItem}>
                    <button
                        onClick={() => {
                            setPeriod(index)
                            circleAnimation()
                        }}
                        ref={(el) => { btnRefs.current[index] = el }}
                        className={period === index ? styles.circleButton2 : styles.circleButton}
                        style={{
                            background: period === index ? 'white' : '#42567A',
                        }}
                    >
                        {index + 1}
                    </button>
                </div>
            ))}
        </div>
    );
};
