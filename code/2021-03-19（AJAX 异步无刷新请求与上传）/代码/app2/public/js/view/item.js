import { getItems } from '../api/index.js';

export async function viewItems(page = 1) {

    let itemListElement = document.querySelector('.list-box .list');
    let paginationElement = document.querySelector('.pagination');

    let data = await getItems(page);

    itemListElement.innerHTML = paginationElement.innerHTML = '';


    itemListElement.innerHTML = nunjucks.renderString(`
        {% for item in items %}
        <li class="item">
            <div class="figure">
                <a href="">
                <img src="/public/images/{{item.cover}}" alt="" />
                </a>
            </div>
            <h3 class="title">
                <a href=""> {{item.name}} </a>
            </h3>
            <p class="desc">一亿像素夜景相机，120Hz六档变速高刷屏</p>
            <p class="price"><span class="num">1599</span>元</p>
        </li>
        {% endfor %}
    `, { items: data.items });


    paginationElement.innerHTML = nunjucks.renderString(`
            <a href="">首页</a>
            <a href="">&lt;</a>
            {% for i in range(0, pages) -%}
            <a href="javascript:;" {%if page == i+1%}class="current"{%endif%}>{{i+1}}</a>
            {%- endfor %}
            <a href="">&gt;</a>
            <a href="">尾页</a>
    `, { pages: data.pages, page });
}