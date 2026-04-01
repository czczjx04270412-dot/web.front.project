
/* ========= 数据 ========= */
const tasks = [
  { name: 'Swap on Uniswap', type: 'defi', xp: 100 },
  { name: 'Mint NFT', type: 'nft', xp: 200 },
  { name: 'Bridge Asset', type: 'defi', xp: 150 },
  { name: 'Create NFT', type: 'nft', xp: 250 },

  { name:'在社区宣传',type:'task',xp:120},
  {name:'制作前端网页',type:'task',xp:100},
  {name:'创造代币',type:'task',xp:300}

];

const leaderboard=[
{name: 'czc',rank:1,xp:5000},
{name:'zjx',rank:2,xp:4000},
{name:'czczjx',rank:3,xp:3000}
]

let currentView = 'Discover';
/* ========= 当前状态 ========= */
let currentFilter = 'all';

/* ========= 渲染 ========= */
function render() {
  const container = document.getElementById('cards');
  const tabsContainer = document.querySelector('.tabs');
  let html = '';

  if (currentView === 'Discover' || currentView === 'Tasks') {
    // 显示 Tabs
    tabsContainer.style.display = 'block';
    
    // 筛选逻辑
    let filteredTasks = tasks;
    /*这两个条件在大条件 if (currentView === 'Discover' || currentView === 'Tasks')里面
    根据小条件并且在网页内展示的动态效果应该是 if (currentView === 'Tasks')
    触发成功nft和defi就失去了功能如果没有点击tasks那就是在discover里面
    那就可以执行更换nft，defi的功能，cards的内容就可以改变、*/
    if (currentView === 'Tasks') {
      filteredTasks = tasks.filter(t => t.type === 'task');
    } else if (currentFilter !== 'all') {
      filteredTasks = tasks.filter(t => t.type === currentFilter);
    }

    filteredTasks.forEach(task => {
      html += `
        <div class="card">
          <h4>${task.name}</h4>
          <div class="xp">XP ${task.xp}</div>
        </div>`;
    });
  } 
  else if (currentView === 'Leaderboard') {
    // 隐藏 Tabs，显示排行榜
    tabsContainer.style.display = 'none';
    html = '<div style="grid-column: 1/4; background:white; padding:20px; border-radius:10px;">';
    leaderboard.forEach(user => {
      html += `
        <div style="display:flex; justify-content:space-between; padding:10px; border-bottom:1px solid #eee;">
          <span>第${user.rank}名 - <strong>${user.name}</strong></span>
          <span style="color:blue;">${user.xp} XP</span>
        </div>`;
    });
    html += '</div>';
  }

  container.innerHTML = html;
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
    currentView = this.innerText; 
    
    // 每次切换主菜单，重置顶部的 Tab 过滤器为 all
    currentFilter = 'all';
    document.querySelectorAll('.tabs button').forEach(btn => btn.classList.remove('active-tab'));
    //[data-type="all"]:抓取css里面的只要它身上带着 data-type="all" 这个属性
        document.querySelector('[data-type="all"]').classList.add('active-tab');
    render();
  });
});

/* ========= 初始化 ========= */
render();
