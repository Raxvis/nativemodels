import Layout from './../components/Layout';
import Link from 'next/link';
import React from 'react';

const Index = () => (
	<Layout>
		<div className="p-16 h-screen">
			<div className="text-center container mx-auto pt-10">
				<h1 className="font-hairline tracking-wide mb-5 text-5xl">Error</h1>
				<p className="text-xl">Something went wrong</p>
				<div className="mt-10">
					<Link href="/">
						<a className="font-normal text-black no-underline border border-black rounded-full rounded-full py-2 px-10 bg-white mx-5">
							Home
						</a>
					</Link>
				</div>
			</div>
		</div>
	</Layout>
);

export default Index;
