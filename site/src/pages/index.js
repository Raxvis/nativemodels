import Head from '../components/Head';
import Layout from '../components/Layout';
import { Link } from 'gatsby';
import React from 'react';

const IndexPage = () => (
	<Layout>
		<Head keywords={['nativemodels']} title="Home" />
		<div
			className="bg-red w-full h-screen flex items-center justify-center"
			style={{ backgroundImage: `linear-gradient(135deg, #B8C2CC, #3D4852)` }}
		>
			<div className="text-center text-xl font-light">
				<h1 className="text-white font-hairline tracking-wide mb-5 text-5xl">Native Models</h1>
				<p className="text-white">Runtime type checking for Javascript Objects.</p>
				<div className="mt-10">
					<a
						className="font-normal text-white no-underline border border-white rounded-full py-2 px-10 tracking-wide mx-5"
						href="https://github.com/Prefinem/nativemodels"
						rel="noopener noreferrer"
						target="_blank"
					>
						Github
					</a>
					<Link
						className="font-normal text-black no-underline rounded-full rounded-full py-2 px-10 bg-white mx-5"
						to="/getting-started/"
					>
						Get Started
					</Link>
				</div>
			</div>
		</div>
	</Layout>
);

export default IndexPage;
