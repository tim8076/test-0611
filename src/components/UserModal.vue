<template>
  <div class="modal fade" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" ref="modal">
    <div class="modal-dialog modal-xl" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 class="modal-title" id="exampleModalLabel">
            <span>新增帳號</span>
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="mb-3">
              <label for="name" class="form-label">姓名</label>
              <input type="text" class="form-control" id="name" placeholder="請輸入姓名" v-model="tempUser.name">
            </div>
            <div class="mb-3">
              <label for="email" class="form-label">電子郵件</label>
              <input type="email" class="form-control" id="email" placeholder="請輸入電子郵件" v-model="tempUser.email">
            </div>
            <div class="mb-3">
              <label for="roleLevel" class="form-label">角色</label>
              <select v-model="tempUser.roleLevel" class="form-select mb-3" aria-label="Default select example"
                id="roleLevel">
                <option value="管理員">管理員</option>
                <option value="編輯">編輯</option>
                <option value="用戶">用戶</option>
                <option value="訪客">訪客</option>
              </select>
            </div>
            <div class="mb-3">
              <label for="status" class="form-label">狀態</label>
              <select v-model="tempUser.status" class="form-select mb-3" aria-label="Default select example"
                id="status">
                <option value="啟用">啟用</option>
                <option value="未啟用">未啟用</option>
              </select>
            </div>
          </div>
        </div>
        <div class="modal-footer bg-white">
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">取消
          </button>
          <button type="button" class="btn btn-primary" @click="updateUser">
            確認
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import modalMixin from '../mixins/modalMixin';
export default {
  name: 'UserModal',
  mixins: [modalMixin],
  props: {
    isNew: {
      type: Boolean,
      default: false
    },
    user: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  watch: {
    user() {
      this.tempUser = { ...this.user };
    }
  },
  data() {
    return {
      modal: {},
      tempUser: {
        roleLevel: '',
        status: '',
      }
    }
  },
  methods: {
    updateUser() {
      console.log('Emitting update-user with:', this.tempUser);
      this.$emit('update-user', this.tempUser);
    }
  }
}
</script>