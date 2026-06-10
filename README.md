# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about IDE Support for Vue in the [Vue Docs Scaling up Guide](https://vuejs.org/guide/scaling-up/tooling.html#ide-support).

```js
export default {
  data() {
    return {
      user: {
        username: '',
        password: ''
      },
      isLoading: false,
    }
  },
  methods: {
    async signIn() {
      this.isLoading = true;
      const api = `${import.meta.env.VITE_APP_API}admin/signin`;
      try {
        const res = await this.$http.post(api, this.user);
        if (res.data.success) {
          const { token, expired } = res.data;
          document.cookie = `ecomToken=${token}; expires=${new Date(expired)}`;
          this.$router.push('/dashboard');
        }
      } catch (error) {
        console.error('Error signing in:', error);
      } finally {
        this.isLoading = false;
      }
    }
  }
}


const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)ecomToken\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
```