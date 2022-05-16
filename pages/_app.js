import '../styles/globals.scss';
import '../src/components/navbar/navbar.scss';
import Layout from '../src/components/Layout';

function MyApp({ Component, pageProps }) {
	return (
		<div className="wrapper">
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</div>
	);
}

export default MyApp;
