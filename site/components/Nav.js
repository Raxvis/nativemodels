import Link from 'next/link';
import React from 'react';

const Nav = () => (
	<div className="bg-grey-darkest fixed pin-t w-full">
		<div className="container mx-auto">
			<nav className="py-2">
				<div className="flex items-center justify-between">
					<div className="flex">
						<img className="mr-2" src="/static/images/logo.png" style={{ height: '34px' }} />
						<Link href="/">
							<a className="text-3xl font-thin text-white no-underline">Nativemodels</a>
						</Link>
					</div>
					<div>
						<ul className="list-reset flex flex-row">
							<li className="p-2">
								<Link href="/">
									<a className="text-white no-underline">Home</a>
								</Link>
							</li>
							<li className="p-2">
								<Link href="/getting-started">
									<a className="text-white no-underline">Getting Started</a>
								</Link>
							</li>
							<li className="p-2">
								<Link href="/docs">
									<a className="text-white no-underline">Docs</a>
								</Link>
							</li>
							<li className="p-2">
								<Link href="https://github.com/Prefinem/nativemodels">
									<a className="text-white no-underline">Github</a>
								</Link>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		</div>
	</div>
);

export default Nav;
