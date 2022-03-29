import { getItems } from "../api/index.js";

export async function viewItems() {

    let items = await getItems();

    let listElement = document.querySelector('.list-box .list');
    listElement.innerHTML = nunjucks.renderString(`
    {% for item in items %}
        <li class="item">
            <div class="figure">
                <a href="">
                <img
                    src="/public/images/{{item.cover}}"
                    alt=""
                />
                </a>
            </div>
            <h3 class="title">
                <a href="">{{item.name}}</a>
            </h3>
            <p class="desc">这是产品简介</p>
            <p class="price"><span class="num">{{ item.price/100 }}</span>元</p>
        </li>
    {% endfor %}
    `, { items });
}