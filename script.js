const postsEl = document.getElementById("posts");
const tagsEl = document.getElementById("tags");
const searchInput = document.getElementById("searchInput");

let allPosts = [];

/* هاشتاجات إضافية */
const tage = [
    "history", "crime", "love", "life", "books", "city",
    "nature", "music", "hope", "energy", "stories", "peace"
];

/* تحميل البوستات */
fetch("https://dummyjson.com/posts?limit=150")
    .then(res => res.json())
    .then(data => {
        allPosts = data.posts.map(post => {
            post.tags.push(
                tage[random(tage.length)],
                tage[random(tage.length)]
            );

            post.views = random(5000);
            post.likes = random(1000);
            post.dislikes = random(100);

            return post;
        });

        showPosts(allPosts);
        showTags(allPosts);
    });

/* عرض البوستات */
function showPosts(posts) {
    postsEl.innerHTML = "";

    posts.forEach(post => {
        postsEl.innerHTML += `
      <div class="post">
        <h2>${post.title}</h2>
        <p>${post.body}</p>

        <div class="post-tags">
          ${post.tags.map(tag =>
            `<span class="click-tag" onclick="filterTag('${tag}')">#${tag}</span>`
        ).join("")}
        </div>

        <div class="stats">
          <span>👁 ${post.views}</span>
          <span>❤️ ${post.likes}</span>
          <span>👎 ${post.dislikes}</span>
        </div>
      </div>
    `;
    });
}

/* عرض الهشتاجات */
function showTags(posts) {
    const tags = [];

    posts.forEach(post => {
        post.tags.forEach(tag => {
            if (!tags.includes(tag)) tags.push(tag);
        });
    });

    tagsEl.innerHTML = "";
    tags.forEach(tag => {
        tagsEl.innerHTML += `
      <div class="tag" onclick="filterTag('${tag}')">#${tag}</div>
    `;
    });
}

/* فلترة بالهاشتاج */
function filterTag(tag) {
    const filtered = allPosts.filter(post => post.tags.includes(tag));
    showPosts(filtered);
    window.scrollTo(0, 0);
}

/* البحث */
searchInput.addEventListener("input", () => {
    const value = searchInput.value.toLowerCase();

    const result = allPosts.filter(post =>
        post.title.toLowerCase().includes(value) ||
        post.body.toLowerCase().includes(value)
    );

    showPosts(result);
});

/* رقم عشوائي */
function random(max) {
    return Math.floor(Math.random() * max);
}
