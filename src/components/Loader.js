import React, { useEffect, useState } from 'react';
import { HashLoader } from 'react-spinners';

const Loader = () => {
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		setLoading(true);
		setTimeout(() => {
			setIsLoading(false);
		}, 3000);
	}, []);
	return (
		<div>
			{isLoading ? (
				<div>
					<HashLoader size={10} loading={loading} />
				</div>
			) : (
				<div>{children}</div>
			)}
		</div>
	);
};

export default Loader;
