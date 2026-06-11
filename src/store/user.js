import { defineStore } from 'pinia'
import axios from 'axios';
const api = 'https://api-frontend-interview-server.metcfire.com.tw'

export default defineStore('userStore', {
  state: () => ({
    users: [],
  }),

  actions: {
    async getUsers() {
      const apiPath = `${api}/accounts`;
      try {
        const response = await axios.get(apiPath, {
          headers: {
            interviewerName: 'Tim'
          }
        });
        this.users = response.data;
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    },
    async addUser(user) {
      console.log('Adding user:', user);
      const apiPath = `${api}/create-account`;
      try {
        const response = await axios.post(apiPath, user, {
          headers: {
            interviewerName: 'Tim'
          }
        });
        this.getUsers();
      } catch (error) {
        console.error('Error adding user:', error);
      } finally {
        this.getUsers();
      }
    },
    async updateUserData(user) {
      console.log('Updating user:', user);
      const apiPath = `${api}/update-account/${user.id}`;
      try {
        const response = await axios.patch(apiPath, user, {
          headers: {
            interviewerName: 'Tim'
          }
        });
      } catch (error) {
        console.error('Error updating user:', error);
      } finally {
        this.getUsers();
      }
    },
    async deleteUser(userId) {
      console.log('Deleting user with ID:', userId);
      const apiPath = `${api}/delete-account/${userId}`;
      try {
        const response = await axios.delete(apiPath, {
          headers: {
            interviewerName: 'Tim'
          }
        });
      } catch (error) {
        console.error('Error deleting user:', error);
      } finally {
        this.getUsers();
      }
    }
  }
})