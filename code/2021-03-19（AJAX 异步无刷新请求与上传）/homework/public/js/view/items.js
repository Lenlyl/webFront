import { getItems } from "../api/index.js";

export async function viewItems(p) {

    let data = await getItems(p);
    const { items, page, totalPage, count } = data;

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

    let paginationElement = document.querySelector('.pagination');
    paginationElement.innerHTML = nunjucks.renderString(`
        <a href="">首页</a>
        <a href="">&lt;</a>
        {% for i in range(0, totalPage)%}
            <a href="javascript:;" {% if i+1 == page %} class="current" {%endif%}>{{i+1}}</a>
        {% endfor %}
        <a href="">&gt;</a>
        <a href="">尾页</a>
    `, { totalPage, page });
}