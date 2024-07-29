import HeaderSliderStyle from './HeaderSlider.module.css';
import { sliderImgs } from '../../utils/Images';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const HeaderSlider = () => {
    let settings = {
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: false,
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    }

    return (
        <div className={HeaderSliderStyle.slider}>
            <div className="container">
                <div className={HeaderSliderStyle.innerSlider}>
                    <Slider {...settings}>
                        <div className={HeaderSliderStyle.sliderItem}>
                            <img src={sliderImgs[0]} alt='slider-item' />
                        </div>
                        <div className={HeaderSliderStyle.sliderItem}>
                            <img src={sliderImgs[1]} alt='slider-item' />
                        </div>
                    </Slider>
                </div>
            </div>
        </div>
    );
}

export default HeaderSlider;