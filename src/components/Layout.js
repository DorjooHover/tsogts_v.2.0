import { GlobalStyles } from '@mui/styled-engine';
import Footer from './Footer';
import Navbar from './Navbar';
import { AuthProvider, useAuth } from '../../config/Auth';
const Layout = props => {
	return (
		<AuthProvider>
			{/* <DotLoader /> */}

			{props.children}

			{/* <Footer /> */}
		</AuthProvider>
	);
};

export default Layout;
