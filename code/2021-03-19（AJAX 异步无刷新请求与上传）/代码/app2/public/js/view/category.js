import { getCategories } from '../api/index.js';

export async function viewCategories() {
    let navListElement = document.querySelector('.nav-list');

    let categories = await getCategories();
    // console.log('categories', categories);

    navListElement.innerHTML = nunjucks.renderString(`
        {% for category in categories %}
        <li class="header-item">
            <a href="" class="link">
            <span class="text">{{category.name}}</span>
            </a>
        </li>
        {% endfor %}
    `, { categories });

    // console.log(str);

}