<template>
  <!-- <h1 class="mb-4 fs-6 fs-md-1">首頁: {{ todo.title }}</h1>
  <div class="container mb-48">
    <button type="button" class="btn btn-primary">Primary</button>
    <button type="button" class="btn btn-secondary">Secondary</button>
    <p class="mb-4">{{ inputText }}</p>
    <input type="email" v-model="user.email" class="form-control" placeholder="請輸入電子郵件">
    <input type="password" v-model="user.password" class="form-control" placeholder="請輸入密碼">
    <p>{{ user.email }} - {{ user.password }}</p>
  </div> -->
  <div class="border-bottom ">
    <div class="container py-5 d-flex justify-content-between align-items-center">
      <div>
        <h1 class="mb-3">帳號管理系統</h1>
        <p>管理您的所有帳號</p>
      </div>
      <button type="button" class="btn btn-primary">登出</button>
    </div>
  </div>
  <div class="container py-5 bg-gray-100">
    <div class="row mb-3">
      <div class="col-md-8 col-lg-10">
        <div class="mb-3 mb-mb-0">
          <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="搜尋帳號(姓名、郵件、角色)"
            v-model="searchQuery">
        </div>
      </div>
      <div class="col-md-4 col-lg-2">
        <button type="button" class="btn btn-primary w-100" @click="openModal(true)">新增帳號</button>
      </div>
    </div>
    <div class="row mb-4 mb-md-10">
      <div class="col-md-4 mb-4 mb-md-0">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">總帳號數</h5>
            <p class="card-text">{{ users.length }}</p>
          </div>
        </div>
      </div>
      <div class="col-md-4 mb-4 mb-md-0">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">啟用中</h5>
            <p class="card-text">{{users.filter(user => user.status === '啟用').length}}</p>
          </div>
        </div>
      </div>
      <div class="col-md-4 mb-4 mb-md-0">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">已停用</h5>
            <p class="card-text">{{users.filter(user => user.status === '未啟用').length}}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6 col-lg-4" v-for="user in searchUsers" :key="user.id">
        <div class="card mb-4">
          <div class="card-body">
            <div class="d-flex align-items-center mb-3">
              <div class="rounded-circle bg-primary card-icon me-3">
                <i class="bi bi-person-fill fs-1 text-white"></i>
              </div>
              <div>
                <h2 class="fs-4 mb-2">{{ user.name }}</h2>
                <p class="badge bg-success">{{ user.status }}</p>
              </div>
            </div>
            <p class="mb-2">
              <i class="bi bi-envelope"></i>
              {{ user.email }}
            </p>
            <p class="mb-2">
              <i class="bi bi-person-fill"></i>
              {{ user.roleLevel }}
            </p>
            <p class="mb-2 ">
              <i class="bi bi-calendar"></i>
              {{ user.createdAt.slice(0, 10) }}
            </p>
          </div>
          <div class="card-footer bg-white">
            <button class="btn btn-outline-primary w-100" @click="openModal(false, user)">編輯帳號</button>
            <button class="btn btn-outline-danger w-100 mt-2" @click="deleteUserData(user.id)">刪除帳號</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <UserModal ref="userModal" :isNew="isNew" :user="tempUser" @update-user="updateUser">
  </UserModal>
</template>
<script>
import UserModal from '../components/UserModal.vue';
import userStore from '../store/user';
import axios from 'axios';
import { mapState, mapActions } from 'pinia';
import modalMixin from '../mixins/modalMixin';
export default {
  name: 'HomeView',
  data() {
    return {
      isNew: false,
      tempUser: {},
      searchQuery: '',
    }
  },
  computed: {
    ...mapState(userStore, ['users']),
    searchUsers() {
      if (!this.searchQuery) {
        return this.users;
      }
      const query = this.searchQuery.toLowerCase();
      return this.users.filter(user =>
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.roleLevel.toLowerCase().includes(query)
      );
    }
  },
  components: {
    UserModal,
  },
  methods: {
    ...mapActions(userStore, ['getUsers', 'addUser', 'updateUserData', 'deleteUser']),
    async getData() {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/todos/1')
        this.todo = response.data;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    async updateUser(user) {
      console.log('Updating user:', user);
      if (this.isNew) {
        await this.addUser(user);
      } else {
        await this.updateUserData(user);
      }
      this.$refs.userModal.hideModal();
    },
    async deleteUserData(userId) {
      await this.deleteUser(userId);
    },
    openModal(isNew, item) {
      if (isNew) {
        this.tempUser = {};
      } else {
        this.tempUser = { ...item };
      }
      this.isNew = isNew
      this.$refs.userModal.showModal();
    },
  },
  created() {
    this.getUsers();
  }
}
</script>