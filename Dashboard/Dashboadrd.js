
/* ========= 数据 ========= */
const tasks = [
  { name: 'Swap on Uniswap', type: 'defi', xp: 100 },
  { name: 'Mint NFT', type: 'nft', xp: 200 },
  { name: 'Bridge Asset', type: 'defi', xp: 150 },
  { name: 'Create NFT', type: 'nft', xp: 250 }

];

/* ========= 当前状态 ========= */
let currentFilter = 'all';

/* ========= 渲染 ========= */
function render() {
  let html = '';
//filteredTasks=筛选完的列表
  let filteredTasks;

  if (currentFilter === 'all') {
    filteredTasks = tasks;
  } else {
    //filter=过滤器， 遍历数组中的每一个元素，检查是否符合你给出的“条件”
    filteredTasks = tasks.filter(task => task.type === currentFilter);
  }

  filteredTasks.forEach(task => {
    html += `
      <div class="card">
        <h4>${task.name}</h4>
        <div class="xp">XP ${task.xp}</div>
      </div>
    `;
  });

  document.getElementById('cards').innerHTML = html;
}

/* ========= Tabs 切换 ========= */
document.querySelectorAll('.tabs button').forEach(button => {
  button.addEventListener('click', function() {

    // 更新状态
    currentFilter = this.dataset.type;

    // UI切换
    document.querySelectorAll('.tabs button')
      .forEach(btn => btn.classList.remove('active-tab'));

    this.classList.add('active-tab');

    render();
  });
});

/* ========= Sidebar 切换 ========= */
document.querySelectorAll('.menu-item').forEach(item => {
  item.addEventListener('click', function() {

    document.querySelectorAll('.menu-item')
      .forEach(i => i.classList.remove('active'));

    this.classList.add('active');
  });
});

/* ========= 初始化 ========= */
render();
