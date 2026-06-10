<template>
  <h1 class="mb-4 fs-6 fs-md-1">首頁: {{ todo.title }}</h1>
  <div class="container mb-48">
    <button type="button" class="btn btn-primary">Primary</button>
    <button type="button" class="btn btn-secondary">Secondary</button>
    <p class="mb-4">{{ inputText }}</p>
    <input type="email" v-model="user.email" class="form-control" placeholder="請輸入電子郵件">
    <input type="password" v-model="user.password" class="form-control" placeholder="請輸入密碼">
    <p>{{ user.email }} - {{ user.password }}</p>
  </div>
</template>
<script>
import axios from 'axios';
export default {
  name: 'HomeView',
  data() {
    return {
      name: 'home',
      todo: {},
      inputText: '這是一個簡單的首頁。',
      user: {
        email: '',
        password: '',
      }
    }
  },
  methods: {
    async getData() {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/todos/1')
        this.todo = response.data;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  },
  created() {
    this.getData();
  }
}
</script>