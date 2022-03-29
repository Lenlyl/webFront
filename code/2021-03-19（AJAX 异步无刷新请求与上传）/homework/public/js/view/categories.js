import { getCategories } from "../api/index.js";

export async function viewCategories() {

    let categories = await getCategories();

    let navListElement = document.querySelector('.nav-list');
    navListElement.innerHTML = nunjucks.renderString(`
    {% for category in categories %} 
        <li class="header-item" id="{{ category.id }}">
        <a href="" class="link">
            <span class="text">{{ category.name }}</span>
        </a>
        </li>
    {% endfor %}
    `, { categories });
}