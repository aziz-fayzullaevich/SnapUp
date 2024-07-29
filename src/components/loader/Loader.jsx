import { loader } from '../../utils/Images';
import LoaderStyle from './Loader.module.css';

const Loader = () => {
    return (
        <div className={LoaderStyle.main}>
            <div className='container'>
                <div className={LoaderStyle.innerLoaderBlock}>
                    <img src={loader} alt="loader" />
                </div>
            </div>
        </div>
    );
}

export default Loader;