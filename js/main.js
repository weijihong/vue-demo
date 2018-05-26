/*jshint esversion:6 */
// 点赞
Vue.component('like', {
  template: '#like-component-tpl',
  data: function() {
    return {
      like_count: 10,
      liked: false
    };
  },
  methods: {
    toggle_like: function() {
      if (!this.liked) {
        this.like_count++;
      } else {
        this.like_count--;
      }
      this.liked = !this.liked;
    }
  }
});

// 弹窗
Vue.component('alert', {
  template: '<button @click="on_click()">弹弹弹</button>',
  props: ["msg"],
  methods: {
    on_click: function() {
      alert(this.msg);
    }
  }
});

//动态显示超链接
Vue.component('user', {
  template: '<a :href="\'/user/\' + this.username">@{{username}}</a>',
  props: ["username"],
  methods: {}
});

//显示余额
//父组件
Vue.component('balance', {
  template: `
  <div>
    <show @show-balance="show_balance"></show>
    <div v-if="show">
      您的余额：￥98
    </div>
  </div>
  `,
  methods: {
    show_balance: function(data) {
      this.show = true;
      console.log('data:', data);
    }
  },
  data: function() {
    return {
      show: false,
    };
  }
});
//子组件
Vue.component('show', {
  template: '<button @click="on_click">显示余额</button>',
  methods: {
    on_click: function() {
      this.$emit('show-balance', {
        a: 1,
        b: 2
      });
    }
  }
});


//定义两个组件，自由通信

//事件调度器
var Event = new Vue();
// 我是组件1
Vue.component('jahony', {
  template: `
  <div>
  我说:<input @keyup="on_change" v-model="i_said" type="text"/><br/>
  </div>
  `,
  data: function() {
    return {
      i_said: '',
    };
  },
  methods: {
    on_change: function() {
      //触发一个事件
      Event.$emit('jahony-said-something', this.i_said);
    }

  }
});
// 我是组件二
Vue.component('wz', {
  template: '<div>wz听见：{{wz_heard}}</div>',
  data: function() {
    return {
      wz_heard: '',
    };
  },
  //初始化完毕
  mounted: function() {
    var me = this;
    Event.$on('jahony-said-something', function(data) {
      me.wz_heard = data;
    });
  },
});



//定义过滤器
Vue.filter('currency', function(val, unit) {
  unit = unit || 元;
  val = val || 0;
  return val + unit;
});

Vue.filter('meter', function(val, unit) {
  val = val || 0;
  unit = unit || 'm';
  return (val / 1000).toFixed(2) + unit;
});
// 参数el即指令所在的元素
// 参数binding指的是这个指令传进来的其他值以及其他基本信息
Vue.directive('pin', function(el, binding) {
  var pinned = binding.value;
  console.log('pinned:', pinned);
  var position = binding.modifiers;
  console.log('pos:', position);
  var warning = binding.arg;
  if (pinned) {
    el.style.position = 'fixed';
    for (var key in position) {
      console.log('位置', key);
      if (position[key]) {
        el.style[key] = '10px';
      }
      if (warning === 'true') {
        el.style.background = 'yellow';

      }
    }
  } else {
    el.style.position = 'static';
  }
});


var base = {
  methods: {
    show: function() {
      this.visible = true;
    },
    hide: function() {
      this.visible = false;
    },
    toggle: function() {
      this.visible = !this.visiblesss;
    },
  },
  data: function() {
    return {
      visible: false,
    };
  }

};

// 点击按钮显示一个段落
Vue.component('popup', {
  template: `
  <div>
    <button @click = "toggle">Popup</button>
    <div v-if="visible">
    <span @click="hide">X</span>
      <h4>titile</h4>
      我是弹出层我是弹出层我是弹出层我是弹出层我是弹出层我是弹出层我是弹出层
    </div>
  </div>
  `,
  mixins: [base]

});

//鼠标悬浮显示内容
Vue.component('tooltip', {
  template: `
    <div>
    <span @mouseenter = "show" @mouseleave="hide">bys</span>
      <div v-if="visible">
        白岩松
      </div>
    </div>
  `,
  mixins: [base]
});

Vue.component("panel", {
  template: '#panel-tpl',
});


new Vue({
  el: '#app',
  data: {
    price: 10,
    length: '1',
    card1: {
      pinned: false
    },
    card2: {
      pinned: false
    },
  }
});
