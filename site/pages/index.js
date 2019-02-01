import Layout from './../components/Layout';
import Link from 'next/link';
import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// import { dark } from 'react-syntax-highlighter/dist/styles/prism';

const example = `const { createModel } = require('nativemodels');
const { computed, string } = require('nativemodels/datatypes');
const { email } = require('nativemodels/customtypes');

const data = {
	fistName: 'John',
	lastName: 'Smith',
	email: 'john.smith@example.com',
};

const schema = {
	fistName: string(),
	lastName: string(),
	fullName: computed((record) => {
		return firstName + ' ' + lastName
	}),
	email: email(),
};

const user = createModel(schema)(data);
`;

const Index = () => (
	<Layout>
		<div
			className="bg-grey-dark p-16 h-screen"
			style={{ backgroundImage: 'linear-gradient(135deg, #B8C2CC, #3D4852)' }}
		>
			<div className="text-center container mx-auto pt-10">
				<h1 className="text-white font-hairline tracking-wide mb-5 text-5xl">Native Models</h1>
				<p className="text-white text-xl">Runtime type checking for Javascript Objects</p>
				<div className="mt-10">
					<Link href="https://github.com/Prefinem/nativemodels">
						<a className="font-normal text-white no-underline border border-white rounded-full py-2 px-10 tracking-wide mx-5">
							Github
						</a>
					</Link>
					<Link href="/getting-started">
						<a className="font-normal text-black no-underline border border-white rounded-full rounded-full py-2 px-10 bg-white mx-5">
							Get Started
						</a>
					</Link>
				</div>
				<div className="m-5 mt-10">
					<SyntaxHighlighter className="rounded" language="javascript">
						{example}
					</SyntaxHighlighter>
				</div>
			</div>
		</div>
	</Layout>
);

export default Index;
