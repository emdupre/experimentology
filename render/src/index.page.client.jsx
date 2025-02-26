import '/src/global.scss'

import TOC         from './components/toc'
import Box         from './components/box'
import { getPage } from 'vite-plugin-ssr/client'
import { hydrate } from 'preact'

const render = async () => {
	const { islands } = await getPage();

	islands.forEach(({ id, name, props }) => {
		const { [ name ]: Component } = { TOC, Box };
		const container = document.getElementById(id);

		hydrate(<Component { ... props }/>, container);

		document.querySelectorAll('a[href]').forEach(a => {
			if (new URL(a.href).origin == origin) {
				a.href = a.href
				.replace(location.origin, '')
				.replace(/^\/(\w+-([^-].+))\.html#\2$/, '$1');
			};
		});
	});
}

render();
