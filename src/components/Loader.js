import React, { useEffect, useState } from 'react';
import { DotLoader } from 'react-loader-spinner';

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
					<DotLoader size={10} loading={loading} />
				</div>
			) : (
				<div>{children}</div>
			)}
		</div>
	);
};

export default Loader;
