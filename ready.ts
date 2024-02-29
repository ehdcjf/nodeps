import prompts from 'prompts';
import { JSDOM } from 'jsdom';

const { pid } = await prompts([
	{
		type: 'number',
		name: 'pid',
		message: 'Please enter the problem ID',
		validate: (pid: any) => Number.isInteger(pid) && pid > 0,
	},
]);
const link = 'https://www.acmicpc.net/problem/' + pid;
const response = await fetch(link);
const html = await response.text();
const dom = new JSDOM(html, {});
const title = dom.window.document.querySelector('#problem_title')?.innerHTML;

const indexTsContent = `
// ${link}
// ${title}
const input = require('fs').readFileSync('./dev/stdin').toString().trim().split('\\n')
`;

Bun.write('index.ts', indexTsContent);

const sampledatas = dom.window.document.querySelectorAll('.sampledata');
sampledatas.forEach((v) => {
	const [_, type, index] = v.id.split('-');
	if (type == 'input') {
		Bun.write('./dev/stdin', v.innerHTML);
	} else {
		Bun.write('./dev/stdout', v.innerHTML);
	}
});
