import { StaticQuery, graphql } from 'gatsby';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import React from 'react';

const detailsQuery = graphql`
	query DefaultSEOQuery {
		site {
			siteMetadata {
				title
				description
				author
			}
		}
	}
`;

function Head({ description, lang, meta, keywords, title }) {
	return (
		<StaticQuery
			query={detailsQuery}
			render={(data) => {
				const metaDescription = description || data.site.siteMetadata.description;

				return (
					<Helmet
						htmlAttributes={{
							lang,
						}}
						meta={[
							{ content: metaDescription, name: 'description' },
							{ content: title, property: 'og:title' },
							{ content: metaDescription, property: 'og:description' },
							{ content: 'website', property: 'og:type' },
							{ content: 'summary', name: 'twitter:card' },
							{ content: data.site.siteMetadata.author, name: 'twitter:creator' },
							{ content: title, name: 'twitter:title' },
							{ content: metaDescription, name: 'twitter:description' },
						]
							.concat(keywords.length > 0 ? { content: keywords.join(', '), name: 'keywords' } : [])
							.concat(meta)}
						title={title}
						titleTemplate={`%s | ${data.site.siteMetadata.title}`}
					>
						<link href="https://cdn.jsdelivr.net/npm/tailwindcss/dist/tailwind.min.css" rel="stylesheet" />
					</Helmet>
				);
			}}
		/>
	);
}

Head.defaultProps = {
	description: '',
	keywords: [],
	lang: 'en',
	meta: [],
};

Head.propTypes = {
	description: PropTypes.string,
	keywords: PropTypes.arrayOf(PropTypes.string),
	lang: PropTypes.string,
	meta: PropTypes.array,
	title: PropTypes.string.isRequired,
};

export default Head;
