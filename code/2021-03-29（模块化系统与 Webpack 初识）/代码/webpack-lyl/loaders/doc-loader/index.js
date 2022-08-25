const Markdown = require('markdown-it');

const markdown = new Markdown();

module.exports = (source) => {
    // console.log(source);
    console.log(markdown.render(source));
    return `export default \`${markdown.render(source)}\``;
}