import { Outlet } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './Header';

const Layout = () => {
  return (
    <>
      <div className="mb-3">
        <Header />
      </div>
      <Container>
        <Outlet />
      </Container>
    </>
  );
};

export default Layout;
