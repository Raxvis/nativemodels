import Head from 'next/head';
import Nav from './Nav';
import React from 'react';

const Layout = ({ children }) => (
	<div className="font-sans antialiased">
		<Head>
			<meta charset="utf-8" key="charset" />
			<meta content="width=device-width, initial-scale=1, shrink-to-fit=no" key="viewport" name="viewport" />
			<title>Nativemodel Docs</title>
			<link href="/static/images/logo.png" rel="shortcut icon" />
			<link href="https://cdn.jsdelivr.net/npm/tailwindcss/dist/tailwind.min.css" rel="stylesheet" />
			<style>{`html, body{margin: 0; padding: 0}`}</style>
		</Head>
		<Nav />
		<div>{children}</div>
	</div>
);

export default Layout;
