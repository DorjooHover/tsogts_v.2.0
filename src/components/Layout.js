import { GlobalStyles } from '@mui/styled-engine';
import Footer from './Footer';
import Navbar from './Navbar';

const Layout = props => {
	return (
		<>
			{/* <DotLoader /> */}

			<Navbar />
			{props.children}

			{/* <Footer /> */}
		</>
	);
};

export default Layout;
