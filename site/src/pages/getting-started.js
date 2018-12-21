import Head from '../components/Head';
import Layout from '../components/layout';
import { Link } from 'gatsby';
import React from 'react';

const SecondPage = () => (
	<Layout>
		<Head title="Getting Started" />
		<h1>Coming Soon</h1>
		<Link to="/">Back</Link>
	</Layout>
);

export default SecondPage;
