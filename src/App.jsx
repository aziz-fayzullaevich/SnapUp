import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home, Cart, CategoryProduct, ProductSingle, Search } from './pages/pages';
import { Provider } from 'react-redux';
import store from './store/store';
import Header from './components/header/Header';
import SideBar from './components/sidebar/Sidebar';
import Footer from './components/footer/Footer';
import LoginPage from './pages/login-page/LoginPage';

const App = () => {
  return (
    <div className='App'>
      <Provider store={store}>
        <BrowserRouter>
          <Header />
          <SideBar />

          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/product/:id' element={<ProductSingle />} />
            <Route path='/category/:category' element={<CategoryProduct />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/search/:searchTerm' element={<Search />} />
            <Route path='/login' element={<LoginPage />} />
          </Routes>

          <Footer />
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;